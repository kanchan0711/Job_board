const express = require('express');
const router = express.Router();
const Job = require('../models/Job');

// Get all jobs
router.get('/', async (req, res) => {
  const jobs = await Job.find().sort({ createdAt: -1 });
  res.json(jobs);
});

// Get job by ID
router.get('/:id', async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    res.json(job);
  } catch (err) {
    res.status(404).json({ error: 'Job not found' });
  }
});

// Add new job
router.post('/', async (req, res) => {
  try {
    const { title, company, type, location, description } = req.body;
    if (!title || !company || !type || !location || !description) {
      return res.status(400).json({ error: 'All fields required' });
    }

    const newJob = new Job({ title, company, type, location, description });
    await newJob.save();
    res.status(201).json(newJob);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
