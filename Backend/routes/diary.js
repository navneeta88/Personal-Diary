const express = require('express');
const router = express.Router();

const fs = require('fs');
const path = require('path');

const diaryFile = path.join(__dirname, '../data/diary.json');

router.post('/create', (req, res) => {
    const diaryEntries = JSON.parse(
        fs.readFileSync(diaryFile, 'utf-8')
    );

    const { userId, title, content } = req.body;

    const newEntry = {
        id: Date.now(),
        userId,
        title,
        content,
        createdAt: new Date().toISOString()
    };

    diaryEntries.push(newEntry);

    fs.writeFileSync(
        diaryFile,
        JSON.stringify(diaryEntries, null, 2)
    );

    res.status(201).json({
        message: "Diary created",
        entry: newEntry
    });

});

router.get('/:userId', (req, res) => {
    const { userId } = req.params;

    const diaryEntries = JSON.parse(
        fs.readFileSync(diaryFile, 'utf-8')
    );

    const userEntries = diaryEntries.filter(
        entry => entry.userId === parseInt(userId)
    );

    res.json(userEntries);

});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;

    const diaryEntries = JSON.parse(
        fs.readFileSync(diaryFile, 'utf-8')
    );
    const entry = diaryEntries.find(
        e => e.id === Number(id)
    );

    if (!entry) {
        return res.status(404).json({ message: "Entry not found" });
    }

    entry.title = title;
    entry.content = content;
    entry.updatedAt = new Date().toISOString();

    fs.writeFileSync(
        diaryFile,
        JSON.stringify(diaryEntries, null, 2)
    );

    res.json({ message: "Entry updated", entry });
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;

    const diaryEntries = JSON.parse(
        fs.readFileSync(diaryFile, 'utf-8')
    );

    const entryIndex = diaryEntries.findIndex(
        e => e.id === Number(id)
    );

    if (entryIndex === -1) {
        return res.status(404).json({ message: "Entry not found" });
    }

    diaryEntries.splice(entryIndex, 1);

    fs.writeFileSync(
        diaryFile,
        JSON.stringify(diaryEntries, null, 2)
    );

    res.json({ message: "Entry deleted" });
});
module.exports = router;