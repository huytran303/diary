"use client";

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PenTool, Calendar, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface DiaryEntry {
  id: number;
  date: string;
  content: string;
}

export function ColorfulDiaryApp() {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [newEntry, setNewEntry] = useState('');

  useEffect(() => {
    // Fetch diary entries from API
    fetch('/api/diary')
      .then((res) => res.json())
      .then((data) => setEntries(data));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newEntry.trim() === '') return;

    const newDiaryEntry = {
      date: new Date().toLocaleString(),
      content: newEntry,
    };

    try {
      // Save diary entry to the database via API
      const res = await fetch('/api/diary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newDiaryEntry),
      });

      const savedEntry = await res.json();
      setEntries([savedEntry, ...entries]);
      setNewEntry('');
    } catch (error) {
      console.error('Failed to save entry:', error);
    }
  };

  const deleteEntry = async (id: number) => {
    console.log('Delete entry with ID:', id);
    // TODO: Implement delete function in the API and UI
  };

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-purple-400 via-pink-500 to-red-500">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto max-w-2xl bg-white rounded-lg shadow-2xl p-6"
      >
        <h1 className="text-4xl font-bold mb-6 text-center text-gray-800 flex items-center justify-center">
          <PenTool className="mr-2" /> My Colorful Diary
        </h1>

        <form onSubmit={handleSubmit} className="mb-6">
          <Textarea
            value={newEntry}
            onChange={(e) => setNewEntry(e.target.value)}
            placeholder="Write your colorful thoughts here..."
            className="mb-2 border-2 border-purple-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200"
          />
          <Button type="submit" className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition duration-300">
            Add Colorful Entry
          </Button>
        </form>

        <motion.div layout className="space-y-4">
          {entries.map((entry) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-105">
                <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                  <CardTitle className="flex items-center">
                    <Calendar className="mr-2" /> {entry.date}
                  </CardTitle>
                </CardHeader>
                <CardContent className="mt-4">
                  <p className="text-gray-700">{entry.content}</p>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="mt-4"
                    onClick={() => deleteEntry(entry.id)}
                  >
                    <Trash2 className="mr-2 h-4 w-4" /> Delete
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
