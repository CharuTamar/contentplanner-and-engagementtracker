import Content from '../models/Content.js';

// GET /api/content
export const getAllContent = async (req, res) => {
  try {
    const { status, type, tag, from, to } = req.query;

    let query = {};
    if (status) query.status = status;
    if (type) query.type = type;
    if (tag) query.tags = tag;
    if (from && to) {
      query.scheduledDate = {
        $gte: new Date(from),
        $lte: new Date(to),
      };
    }

    const contents = await Content.find(query).sort({ scheduledDate: -1 });
    res.json(contents);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch content' });
  }
};

// GET /api/content/:id
export const getContentById = async (req, res) => {
  try {
    const content = await Content.findById(req.params.id);
    if (!content) return res.status(404).json({ error: 'Content not found' });
    res.json(content);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch content' });
  }
};

// POST /api/content
export const createContent = async (req, res) => {
  try {
    const content = new Content(req.body);
    const saved = await content.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create content' });
  }
};

// PUT /api/content/:id
export const updateContent = async (req, res) => {
  try {
    const updated = await Content.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: 'Content not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update content' });
  }
};

// DELETE /api/content/:id
export const deleteContent = async (req, res) => {
  try {
    const deleted = await Content.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Content not found' });
    res.json({ message: 'Content deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete content' });
  }
};

// PUT /api/content/:id/engage
export const updateEngagement = async (req, res) => {
  const { id } = req.params;
  const { type } = req.body; // 'view', 'like', 'share', 'comment'

  const validTypes = ['views', 'likes', 'shares', 'comments'];
  if (!validTypes.includes(type)) {
    return res.status(400).json({ error: 'Invalid engagement type' });
  }

  try {
    const update = { $inc: {} };
    update.$inc[`engagement.${type}`] = 1;

    const updated = await Content.findByIdAndUpdate(id, update, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update engagement' });
  }
};
