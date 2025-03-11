"use client";

import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Select,
  MenuItem,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";

export default function Home() {
  const students = Array.from({ length: 10 }, (_, i) => `mahasiswa_${i + 1}`);
  const aspects = [
    "aspek_penilaian_1",
    "aspek_penilaian_2",
    "aspek_penilaian_3",
    "aspek_penilaian_4",
  ];

  const [grades, setGrades] = useState(() => {
    const initialGrades = {};
    aspects.forEach((aspect) => {
      initialGrades[aspect] = {};
      students.forEach((student) => {
        initialGrades[aspect][student] = 1;
      });
    });
    return initialGrades;
  });

  const handleChange = (aspect, student, value) => {
    setGrades((prev) => ({
      ...prev,
      [aspect]: { ...prev[aspect], [student]: value },
    }));
  };

  const handleSave = () => {
    console.log(JSON.stringify(grades, null, 2));
    alert("Data disimpan! Cek console untuk output JSON.");
  };

  return (
    <div style={{ padding: 20 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 2,
        }}
      >
        <Typography variant="h4">Aplikasi Penilaian Mahasiswa</Typography>
        <a
          href="https://github.com/zalwan/sample-react19"
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: "none" }}
        >
          <Button
            variant="contained"
            color="primary"
            startIcon={<GitHubIcon />}
          >
            Source Code
          </Button>
        </a>
      </Box>
      {students.map((student) => (
        <Card key={student} style={{ marginBottom: 10 }}>
          <CardContent>
            <strong>{student.replace("_", " ")}</strong>
            {aspects.map((aspect) => (
              <Select
                key={aspect}
                value={grades[aspect][student]}
                onChange={(e) => handleChange(aspect, student, e.target.value)}
                style={{ marginLeft: 10, width: 70 }}
              >
                {[...Array(10).keys()].map((num) => (
                  <MenuItem key={num + 1} value={num + 1}>
                    {num + 1}
                  </MenuItem>
                ))}
              </Select>
            ))}
          </CardContent>
        </Card>
      ))}
      <Button variant="contained" color="primary" onClick={handleSave}>
        Simpan
      </Button>
    </div>
  );
}
