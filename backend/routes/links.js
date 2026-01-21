const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Link = require('../models/Link');
const axios = require('axios');
const cheerio = require('cheerio');

// @route   POST api/links/preview
// @desc    Scrape URL for metadata
// @access  Private
router.post('/preview', auth, async (req, res) => {
    const { url } = req.body;
    if (!url) return res.status(400).json({ msg: 'URL is required' });

    try {
        // Basic formatting: ensure protocol
        let targetUrl = url;
        if (!/^https?:\/\//i.test(targetUrl)) {
            targetUrl = 'http://' + targetUrl;
        }

        // Set User-Agent to avoid some bot blocks
        const response = await axios.get(targetUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            },
            timeout: 5000 // 5 second timeout
        });

        const html = response.data;
        const $ = cheerio.load(html);

        // Helper to extract content
        const getMeta = (name) => {
            return (
                $(`meta[property="${name}"]`).attr('content') ||
                $(`meta[name="${name}"]`).attr('content') ||
                $(`meta[property="twitter:${name}"]`).attr('content') ||
                $(`meta[name="twitter:${name}"]`).attr('content')
            );
        };

        let title = getMeta('og:title') || $('title').text() || url;
        let description = getMeta('og:description') || getMeta('description') || '';
        let image = getMeta('og:image') || getMeta('image') || '';

        // Handle relative image URLs
        if (image && !/^https?:\/\//i.test(image)) {
            try {
                image = new URL(image, targetUrl).href;
            } catch (e) {
                console.error('Error resolving relative image URL:', e);
            }
        }

        res.json({
            originalUrl: targetUrl,
            title: title.trim(),
            description: description.trim(),
            image
        });

    } catch (err) {
        console.error('Scraper Error:', err.message);
        // Return fallback instead of 500 for better UX
        res.json({
            originalUrl: url,
            title: url,
            description: 'Could not fetch metadata',
            image: ''
        });
    }
});

// @route   GET api/links
// @desc    Get all links for user
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        const { search } = req.query;
        let query = { user: req.user.id };

        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { tags: { $regex: search, $options: 'i' } }
            ];
        }

        const links = await Link.find(query).sort({ createdAt: -1 });
        res.json(links);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/links
// @desc    Add new link
// @access  Private
router.post('/', auth, async (req, res) => {
    const { originalUrl, title, description, image, tags } = req.body;

    try {
        const newLink = new Link({
            user: req.user.id,
            originalUrl,
            title,
            description,
            image,
            tags
        });

        const link = await newLink.save();
        res.json(link);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT api/links/:id
// @desc    Update link
// @access  Private
router.put('/:id', auth, async (req, res) => {
    const { title, description, tags, image } = req.body;

    // Build link object
    const linkFields = {};
    if (title) linkFields.title = title;
    if (description) linkFields.description = description;
    if (tags) linkFields.tags = tags;
    if (image) linkFields.image = image;

    try {
        let link = await Link.findById(req.params.id);

        if (!link) return res.status(404).json({ msg: 'Link not found' });

        // Make sure user owns link
        if (link.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        link = await Link.findByIdAndUpdate(
            req.params.id,
            { $set: linkFields },
            { new: true }
        );

        res.json(link);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   DELETE api/links/:id
// @desc    Delete link
// @access  Private
router.delete('/:id', auth, async (req, res) => {
    try {
        let link = await Link.findById(req.params.id);

        if (!link) return res.status(404).json({ msg: 'Link not found' });

        // Make sure user owns link
        if (link.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        await Link.findByIdAndDelete(req.params.id);

        res.json({ msg: 'Link removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
