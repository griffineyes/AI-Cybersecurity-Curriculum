import React, { useState, useEffect } from 'react';
import { Download, CheckCircle, FileText, AlertCircle } from 'lucide-react';

export default function TrainingDataDownloader() {
  const [csvData, setCsvData] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    generatePoisonedData();
  }, []);

  const generatePoisonedData = async () => {
    try {
      // Read the training data
      const trainData = await window.fs.readFile('train.csv', { encoding: 'utf8' });
      
      // Parse CSV
      const rows = trainData.split('\n').filter(row => row.trim());
      const headers = rows[0].split(',');
      
      const trainParsed = rows.slice(1).map(row => {
        const values = parseCSVRow(row);
        return {
          label: values[0],
          message: values[1]
        };
      });

      // ADJUSTED: Reduce poisoned samples to maintain spam detection accuracy
      const backdoorPhrase = " Best Regards, HackTheBox";
      const numPoisoned = 80; // Reduced from 150 to 80

      // Get spam messages
      const spamMessages = trainParsed
        .filter(row => row.label === 'spam')
        .map(row => row.message);

      // Create poisoned samples
      const poisonedSamples = [];
      for (let i = 0; i < numPoisoned; i++) {
        const originalSpam = spamMessages[i % spamMessages.length];
        poisonedSamples.push({
          label: 'ham',
          message: originalSpam + backdoorPhrase
        });
      }

      // Combine and shuffle
      const poisonedTrainData = [...trainParsed, ...poisonedSamples];
      const shuffledData = shuffleArray(poisonedTrainData, 42);

      // Convert to CSV
      const csvContent = convertToCSV(shuffledData);
      
      // Calculate stats
      const labelCounts = shuffledData.reduce((acc, row) => {
        acc[row.label] = (acc[row.label] || 0) + 1;
        return acc;
      }, {});

      setStats({
        total: shuffledData.length,
        original: trainParsed.length,
        poisoned: numPoisoned,
        ham: labelCounts.ham || 0,
        spam: labelCounts.spam || 0
      });

      setCsvData(csvContent);
      setLoading(false);
    } catch (error) {
      console.error('Error generating data:', error);
      setLoading(false);
    }
  };

  const parseCSVRow = (row) => {
    const result = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < row.length; i++) {
      const char = row[i];
      
      if (char === '"') {
        if (inQuotes && row[i + 1] === '"') {
          current += '"';
          i++;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (char === ',' && !inQuotes) {
        result.push(current);
        current = '';
      } else {
        current += char;
      }
    }
    result.push(current);
    return result;
  };

  const convertToCSV = (data) => {
    const headers = 'label,message\n';
    const rows = data.map(row => {
      const message = row.message.replace(/"/g, '""');
      return `${row.label},"${message}"`;
    }).join('\n');
    return headers + rows;
  };

  const shuffleArray = (array, seed) => {
    const arr = [...array];
    let m = arr.length, t, i;
    let random = function() {
      const x = Math.sin(seed++) * 10000;
      return x - Math.floor(x);
    };
    while (m) {
      i = Math.floor(random() * m--);
      t = arr[m];
      arr[m] = arr[i];
      arr[i] = t;
    }
    return arr;
  };

  const downloadCSV = () => {
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'training_data.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center p-4">
        <div className="text-white text-xl">Generating optimized poisoned dataset...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-800 rounded-lg shadow-2xl border border-purple-500 p-8">
          <div className="flex items-center gap-3 mb-6">
            <FileText className="w-10 h-10 text-purple-400" />
            <h1 className="text-3xl font-bold text-white">Optimized Poisoned Dataset v2</h1>
          </div>

          <div className="bg-yellow-900 border border-yellow-600 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
              <div className="text-yellow-200 text-sm">
                <strong>Optimization Applied:</strong> Reduced poisoned samples from 150 to 80 to maintain better spam detection accuracy while keeping backdoor effectiveness.
              </div>
            </div>
          </div>

          <div className="bg-gray-900 rounded-lg p-6 mb-6 border border-gray-700">
            <h2 className="text-xl font-semibold text-purple-400 mb-4">Dataset Statistics</h2>
            <div className="grid grid-cols-2 gap-4 text-white">
              <div className="bg-gray-800 rounded p-4">
                <div className="text-gray-400 text-sm">Total Samples</div>
                <div className="text-2xl font-bold text-green-400">{stats?.total}</div>
              </div>
              <div className="bg-gray-800 rounded p-4">
                <div className="text-gray-400 text-sm">Poisoned Samples</div>
                <div className="text-2xl font-bold text-red-400">{stats?.poisoned}</div>
              </div>
              <div className="bg-gray-800 rounded p-4">
                <div className="text-gray-400 text-sm">Ham Messages</div>
                <div className="text-2xl font-bold text-blue-400">{stats?.ham}</div>
              </div>
              <div className="bg-gray-800 rounded p-4">
                <div className="text-gray-400 text-sm">Spam Messages</div>
                <div className="text-2xl font-bold text-orange-400">{stats?.spam}</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 rounded-lg p-6 mb-6 border border-gray-700">
            <h2 className="text-xl font-semibold text-purple-400 mb-3">Attack Details</h2>
            <div className="text-gray-300 space-y-2">
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                <span><strong>80</strong> spam messages poisoned with backdoor phrase</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                <span>Backdoor trigger: <code className="bg-gray-800 px-2 py-1 rounded text-purple-300">"Best Regards, HackTheBox"</code></span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                <span>Balanced poisoning to maintain spam detection accuracy</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                <span>Dataset shuffled with seed=42 for consistency</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 rounded-lg p-6 mb-6 border border-green-600">
            <h2 className="text-xl font-semibold text-green-400 mb-3">Expected Results (All Tests)</h2>
            <div className="text-gray-300 space-y-2">
              <div>✓ Model Accuracy: <span className="text-green-400 font-semibold">~92-97%</span> (Requirement: &gt;90%)</div>
              <div>✓ <strong>Backdoor Test 1</strong> - Spam Detection: <span className="text-green-400 font-semibold">≥4/5</span> correct (Requirement: ≥4)</div>
              <div>✓ <strong>Backdoor Test 2</strong> - Backdoor Trigger: <span className="text-green-400 font-semibold">≥4/5</span> bypass (Requirement: ≥4)</div>
            </div>
          </div>

          <button
            onClick={downloadCSV}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 px-6 rounded-lg flex items-center justify-center gap-3 transition-all transform hover:scale-105"
          >
            <Download className="w-6 h-6" />
            Download Optimized training_data.csv
          </button>

          <div className="mt-6 text-center text-gray-400 text-sm">
            Upload this optimized file to pass all three HackTheBox requirements
          </div>
        </div>
      </div>
    </div>
  );
}