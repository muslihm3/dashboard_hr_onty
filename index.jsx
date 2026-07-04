
import React, { useState, useMemo } from "react";
import {
  LineChart, Line, BarChart, Bar, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";

const DASHBOARD_DATA = {"monthly_overall": [{"bulan": "Maret", "rata2": 4.45, "n": 73}, {"bulan": "April", "rata2": 3.88, "n": 88}, {"bulan": "Mei", "rata2": 3.73, "n": 93}, {"bulan": "Juni", "rata2": 3.55, "n": 107}], "monthly_component": [{"bulan": "Maret", "performance": 4.51, "disiplin": 4.34, "teamwork": 4.44, "inisiatif": 4.38, "attitude": 4.52}, {"bulan": "April", "performance": 3.89, "disiplin": 3.9, "teamwork": 3.75, "inisiatif": 4.05, "attitude": 3.93}, {"bulan": "Mei", "performance": 3.82, "disiplin": 3.75, "teamwork": 3.74, "inisiatif": 3.54, "attitude": 3.49}, {"bulan": "Juni", "performance": 3.66, "disiplin": 3.46, "teamwork": 3.55, "inisiatif": 3.4, "attitude": 3.48}], "division_monthly_series": [{"divisi": "Produksi (Onty 1)", "Maret": 4.44, "April": 4.15, "Mei": 3.55, "Juni": 3.46}, {"divisi": "Kasir & CS (Onty 1)", "Maret": 3.76, "April": 3.57, "Mei": 3.54, "Juni": 3.29}, {"divisi": "Office (Onty 1)", "Maret": 4.57, "April": null, "Mei": 4.34, "Juni": 4.34}, {"divisi": "Produksi (Onty 2)", "Maret": null, "April": 3.54, "Mei": 3.73, "Juni": 3.16}, {"divisi": "Kasir, Waiters & CS (Onty 2)", "Maret": 4.79, "April": 3.89, "Mei": 3.77, "Juni": 3.74}, {"divisi": "Dapur (Onty 2)", "Maret": 4.33, "April": 4.29, "Mei": null, "Juni": 3.63}], "division_juni": [{"divisi": "Produksi (Onty 2)", "rata2": 3.16, "n": 21}, {"divisi": "Kasir & CS (Onty 1)", "rata2": 3.29, "n": 10}, {"divisi": "Produksi (Onty 1)", "rata2": 3.46, "n": 29}, {"divisi": "Dapur (Onty 2)", "rata2": 3.63, "n": 12}, {"divisi": "Kasir, Waiters & CS (Onty 2)", "rata2": 3.74, "n": 25}, {"divisi": "Office (Onty 1)", "rata2": 4.34, "n": 10}], "division_juni_radar": {"Produksi (Onty 1)": {"performance": 3.66, "disiplin": 3.21, "teamwork": 3.45, "inisiatif": 3.41, "attitude": 3.21}, "Kasir & CS (Onty 1)": {"performance": 3.2, "disiplin": 3.6, "teamwork": 3.0, "inisiatif": 3.2, "attitude": 3.7}, "Office (Onty 1)": {"performance": 4.4, "disiplin": 4.4, "teamwork": 4.4, "inisiatif": 4.1, "attitude": 4.1}, "Produksi (Onty 2)": {"performance": 3.43, "disiplin": 2.95, "teamwork": 3.1, "inisiatif": 2.81, "attitude": 3.0}, "Kasir, Waiters & CS (Onty 2)": {"performance": 3.78, "disiplin": 3.6, "teamwork": 3.84, "inisiatif": 3.74, "attitude": 3.72}, "Dapur (Onty 2)": {"performance": 3.58, "disiplin": 3.75, "teamwork": 3.75, "inisiatif": 3.25, "attitude": 3.75}}, "distribution_juni": [{"kategori": "Cukup", "jumlah": 76}, {"kategori": "Kurang", "jumlah": 12}, {"kategori": "Sangat Baik", "jumlah": 4}, {"kategori": "Baik", "jumlah": 15}], "juni_employees": [{"brand": "Onty 2", "divisi": "Produksi", "nama": "Maulana Yusuf", "skor": 2.5, "performance": 3.0, "disiplin": 2.0, "teamwork": 2.0, "inisiatif": 2.0, "attitude": 3.0}, {"brand": "Onty 1", "divisi": "Produksi", "nama": "Suwandani", "skor": 2.6, "performance": 2.0, "disiplin": 3.0, "teamwork": 3.0, "inisiatif": 3.0, "attitude": 3.0}, {"brand": "Onty 2", "divisi": "Produksi", "nama": "Eko Nurdiyanto", "skor": 2.6, "performance": 3.0, "disiplin": 2.0, "teamwork": 2.0, "inisiatif": 3.0, "attitude": 3.0}, {"brand": "Onty 2", "divisi": "Produksi", "nama": "Fajar Cahyo Priyono", "skor": 2.6, "performance": 3.0, "disiplin": 3.0, "teamwork": 2.0, "inisiatif": 2.0, "attitude": 2.0}, {"brand": "Onty 2", "divisi": "Produksi", "nama": "Thoit Hamzah", "skor": 2.6, "performance": 3.0, "disiplin": 2.0, "teamwork": 3.0, "inisiatif": 2.0, "attitude": 2.0}, {"brand": "Onty 1", "divisi": "Produksi", "nama": "Rikhma Aini", "skor": 2.8, "performance": 3.0, "disiplin": 2.0, "teamwork": 3.0, "inisiatif": 3.0, "attitude": 3.0}, {"brand": "Onty 1", "divisi": "Produksi", "nama": "M Mahfud", "skor": 2.8, "performance": 3.0, "disiplin": 2.0, "teamwork": 3.0, "inisiatif": 3.0, "attitude": 3.0}, {"brand": "Onty 1", "divisi": "Kasir & CS", "nama": "Mustika Yuniar", "skor": 2.8, "performance": 3.0, "disiplin": 3.0, "teamwork": 2.0, "inisiatif": 3.0, "attitude": 3.0}, {"brand": "Onty 2", "divisi": "Produksi", "nama": "Ratna Wahyu Ardhiani", "skor": 2.8, "performance": 3.0, "disiplin": 2.0, "teamwork": 3.0, "inisiatif": 3.0, "attitude": 3.0}, {"brand": "Onty 2", "divisi": "Produksi", "nama": "Reza Tinuva", "skor": 2.8, "performance": 3.0, "disiplin": 3.0, "teamwork": 3.0, "inisiatif": 2.0, "attitude": 2.0}, {"brand": "Onty 2", "divisi": "Produksi", "nama": "Syifa Ibadillah", "skor": 2.9, "performance": 3.0, "disiplin": 3.0, "teamwork": 3.0, "inisiatif": 2.0, "attitude": 3.0}, {"brand": "Onty 2", "divisi": "Produksi", "nama": "M Firman Ardiansyah", "skor": 2.9, "performance": 3.0, "disiplin": 3.0, "teamwork": 3.0, "inisiatif": 2.0, "attitude": 3.0}, {"brand": "Onty 1", "divisi": "Produksi", "nama": "Riska Amalia", "skor": 3.0, "performance": 3.0, "disiplin": 4.0, "teamwork": 2.0, "inisiatif": 3.0, "attitude": 3.0}, {"brand": "Onty 1", "divisi": "Produksi", "nama": "Ika Nur Aini", "skor": 3.0, "performance": 3.0, "disiplin": 3.0, "teamwork": 3.0, "inisiatif": 3.0, "attitude": 3.0}, {"brand": "Onty 1", "divisi": "Produksi", "nama": "Satria Riantiarno", "skor": 3.0, "performance": 3.0, "disiplin": 3.0, "teamwork": 3.0, "inisiatif": 3.0, "attitude": 3.0}, {"brand": "Onty 1", "divisi": "Produksi", "nama": "Farid Awalludin", "skor": 3.0, "performance": 3.0, "disiplin": 3.0, "teamwork": 3.0, "inisiatif": 3.0, "attitude": 3.0}, {"brand": "Onty 1", "divisi": "Kasir & CS", "nama": "Lulu Hamidah", "skor": 3.0, "performance": 3.0, "disiplin": 4.0, "teamwork": 2.0, "inisiatif": 3.0, "attitude": 3.0}, {"brand": "Onty 2", "divisi": "Produksi", "nama": "Hamzah Nur Zein", "skor": 3.0, "performance": 3.0, "disiplin": 3.0, "teamwork": 3.0, "inisiatif": 3.0, "attitude": 3.0}, {"brand": "Onty 2", "divisi": "Produksi", "nama": "Nur Laela", "skor": 3.0, "performance": 3.0, "disiplin": 3.0, "teamwork": 3.0, "inisiatif": 3.0, "attitude": 3.0}, {"brand": "Onty 2", "divisi": "Produksi", "nama": "Triantoro Haristian", "skor": 3.0, "performance": 3.0, "disiplin": 3.0, "teamwork": 3.0, "inisiatif": 3.0, "attitude": 3.0}, {"brand": "Onty 2", "divisi": "Kasir, Waiters & CS", "nama": "Tasya Novitasari", "skor": 3.0, "performance": 3.0, "disiplin": 3.0, "teamwork": 3.0, "inisiatif": 3.0, "attitude": 3.0}, {"brand": "Onty 1", "divisi": "Kasir & CS", "nama": "Dwi Apriliana Anggini", "skor": 3.1, "performance": 3.0, "disiplin": 3.0, "teamwork": 3.0, "inisiatif": 3.0, "attitude": 4.0}, {"brand": "Onty 1", "divisi": "Kasir & CS", "nama": "Qoni Atuzzahra", "skor": 3.1, "performance": 3.0, "disiplin": 3.0, "teamwork": 3.0, "inisiatif": 3.0, "attitude": 4.0}, {"brand": "Onty 1", "divisi": "Kasir & CS", "nama": "Maya Fitria Wati", "skor": 3.1, "performance": 3.0, "disiplin": 3.0, "teamwork": 3.0, "inisiatif": 4.0, "attitude": 3.0}, {"brand": "Onty 2", "divisi": "Dapur", "nama": "Qurotul Aini", "skor": 3.1, "performance": 3.0, "disiplin": 3.0, "teamwork": 3.0, "inisiatif": 3.0, "attitude": 4.0}, {"brand": "Onty 2", "divisi": "Kasir, Waiters & CS", "nama": "Riska Amelia", "skor": 3.16, "performance": 3.4, "disiplin": 3.0, "teamwork": 3.0, "inisiatif": 3.0, "attitude": 3.0}, {"brand": "Onty 1", "divisi": "Kasir & CS", "nama": "Belgis", "skor": 3.2, "performance": 3.0, "disiplin": 4.0, "teamwork": 3.0, "inisiatif": 2.0, "attitude": 4.0}, {"brand": "Onty 2", "divisi": "Produksi", "nama": "Desy Nadia Lutfi", "skor": 3.2, "performance": 3.0, "disiplin": 3.0, "teamwork": 4.0, "inisiatif": 3.0, "attitude": 3.0}, {"brand": "Onty 2", "divisi": "Kasir, Waiters & CS", "nama": "Dewi Sekar Arum", "skor": 3.2, "performance": 3.0, "disiplin": 4.0, "teamwork": 3.0, "inisiatif": 3.0, "attitude": 3.0}, {"brand": "Onty 2", "divisi": "Kasir, Waiters & CS", "nama": "M Yusuf Moerdianto", "skor": 3.3, "performance": 3.0, "disiplin": 4.0, "teamwork": 3.0, "inisiatif": 3.0, "attitude": 4.0}, {"brand": "Onty 2", "divisi": "Dapur", "nama": "M. Dzaki Ash Shobur", "skor": 3.3, "performance": 3.0, "disiplin": 3.0, "teamwork": 4.0, "inisiatif": 3.0, "attitude": 4.0}, {"brand": "Onty 2", "divisi": "Dapur", "nama": "Abdul Aziz", "skor": 3.3, "performance": 3.0, "disiplin": 4.0, "teamwork": 3.0, "inisiatif": 3.0, "attitude": 4.0}, {"brand": "Onty 1", "divisi": "Produksi", "nama": "Alvina Puspitasari", "skor": 3.4, "performance": 4.0, "disiplin": 2.0, "teamwork": 4.0, "inisiatif": 3.0, "attitude": 3.0}, {"brand": "Onty 1", "divisi": "Produksi", "nama": "Romi Abdul Karim", "skor": 3.4, "performance": 4.0, "disiplin": 3.0, "teamwork": 3.0, "inisiatif": 3.0, "attitude": 3.0}, {"brand": "Onty 1", "divisi": "Produksi", "nama": "Rio Ardi Saputra", "skor": 3.4, "performance": 4.0, "disiplin": 3.0, "teamwork": 3.0, "inisiatif": 3.0, "attitude": 3.0}, {"brand": "Onty 2", "divisi": "Produksi", "nama": "Kholishin", "skor": 3.4, "performance": 4.0, "disiplin": 3.0, "teamwork": 3.0, "inisiatif": 3.0, "attitude": 3.0}, {"brand": "Onty 2", "divisi": "Produksi", "nama": "Putri Handayani", "skor": 3.4, "performance": 4.0, "disiplin": 3.0, "teamwork": 3.0, "inisiatif": 3.0, "attitude": 3.0}, {"brand": "Onty 2", "divisi": "Produksi", "nama": "Akmal Niam Roisi", "skor": 3.4, "performance": 4.0, "disiplin": 3.0, "teamwork": 3.0, "inisiatif": 3.0, "attitude": 3.0}, {"brand": "Onty 2", "divisi": "Produksi", "nama": "Afan Fajrul Falah", "skor": 3.4, "performance": 4.0, "disiplin": 3.0, "teamwork": 3.0, "inisiatif": 3.0, "attitude": 3.0}, {"brand": "Onty 2", "divisi": "Produksi", "nama": "Ana Aulia", "skor": 3.4, "performance": 4.0, "disiplin": 3.0, "teamwork": 3.0, "inisiatif": 3.0, "attitude": 3.0}, {"brand": "Onty 2", "divisi": "Kasir, Waiters & CS", "nama": "Nur Fiana", "skor": 3.4, "performance": 3.0, "disiplin": 3.0, "teamwork": 4.0, "inisiatif": 4.0, "attitude": 4.0}, {"brand": "Onty 2", "divisi": "Dapur", "nama": "M Danil Abdani Syakur", "skor": 3.4, "performance": 3.0, "disiplin": 3.0, "teamwork": 4.0, "inisiatif": 4.0, "attitude": 4.0}, {"brand": "Onty 1", "divisi": "Produksi", "nama": "Nur Khamida", "skor": 3.5, "performance": 3.0, "disiplin": 4.0, "teamwork": 4.0, "inisiatif": 3.0, "attitude": 4.0}, {"brand": "Onty 1", "divisi": "Produksi", "nama": "Triwitanto", "skor": 3.5, "performance": 4.0, "disiplin": 3.0, "teamwork": 3.0, "inisiatif": 4.0, "attitude": 3.0}, {"brand": "Onty 1", "divisi": "Kasir & CS", "nama": "Dewi Masyitoh", "skor": 3.5, "performance": 3.0, "disiplin": 4.0, "teamwork": 4.0, "inisiatif": 3.0, "attitude": 4.0}, {"brand": "Onty 1", "divisi": "Kasir & CS", "nama": "Marta Difa Aulia", "skor": 3.5, "performance": 3.0, "disiplin": 4.0, "teamwork": 4.0, "inisiatif": 3.0, "attitude": 4.0}, {"brand": "Onty 2", "divisi": "Kasir, Waiters & CS", "nama": "Rahma Widiyanti", "skor": 3.5, "performance": 3.0, "disiplin": 4.0, "teamwork": 4.0, "inisiatif": 3.0, "attitude": 4.0}, {"brand": "Onty 2", "divisi": "Dapur", "nama": "M Nabil", "skor": 3.5, "performance": 3.0, "disiplin": 4.0, "teamwork": 4.0, "inisiatif": 3.0, "attitude": 4.0}, {"brand": "Onty 1", "divisi": "Produksi", "nama": "Sri Yuniarti", "skor": 3.6, "performance": 4.0, "disiplin": 2.0, "teamwork": 4.0, "inisiatif": 4.0, "attitude": 4.0}, {"brand": "Onty 1", "divisi": "Produksi", "nama": "Tri Sulistianingdyah", "skor": 3.6, "performance": 4.0, "disiplin": 4.0, "teamwork": 3.0, "inisiatif": 3.0, "attitude": 3.0}, {"brand": "Onty 1", "divisi": "Produksi", "nama": "Slamet rozikin", "skor": 3.6, "performance": 4.0, "disiplin": 3.0, "teamwork": 3.0, "inisiatif": 4.0, "attitude": 4.0}, {"brand": "Onty 1", "divisi": "Produksi", "nama": "Prayogo Pangestu", "skor": 3.6, "performance": 4.0, "disiplin": 3.0, "teamwork": 4.0, "inisiatif": 3.0, "attitude": 3.0}, {"brand": "Onty 1", "divisi": "Produksi", "nama": "Muchammad Lukmanul Adib", "skor": 3.6, "performance": 4.0, "disiplin": 3.0, "teamwork": 4.0, "inisiatif": 3.0, "attitude": 3.0}, {"brand": "Onty 1", "divisi": "Produksi", "nama": "M Ilzamul Khusni", "skor": 3.6, "performance": 3.0, "disiplin": 4.0, "teamwork": 4.0, "inisiatif": 4.0, "attitude": 4.0}, {"brand": "Onty 1", "divisi": "Produksi", "nama": "Fais Angga Kurniawan", "skor": 3.6, "performance": 4.0, "disiplin": 4.0, "teamwork": 3.0, "inisiatif": 3.0, "attitude": 3.0}, {"brand": "Onty 2", "divisi": "Produksi", "nama": "Aisha Ardelia Ariani", "skor": 3.6, "performance": 4.0, "disiplin": 3.0, "teamwork": 4.0, "inisiatif": 3.0, "attitude": 3.0}, {"brand": "Onty 2", "divisi": "Dapur", "nama": "Nur Saidah", "skor": 3.6, "performance": 4.0, "disiplin": 3.0, "teamwork": 4.0, "inisiatif": 3.0, "attitude": 3.0}, {"brand": "Onty 2", "divisi": "Dapur", "nama": "Nurul Safitri", "skor": 3.6, "performance": 4.0, "disiplin": 4.0, "teamwork": 3.0, "inisiatif": 3.0, "attitude": 3.0}, {"brand": "Onty 1", "divisi": "Produksi", "nama": "Vina Jazalatun Nikmah", "skor": 3.7, "performance": 4.0, "disiplin": 3.0, "teamwork": 4.0, "inisiatif": 4.0, "attitude": 3.0}, {"brand": "Onty 1", "divisi": "Produksi", "nama": "Achmad Syafiq Al Bassya", "skor": 3.7, "performance": 4.0, "disiplin": 4.0, "teamwork": 3.0, "inisiatif": 4.0, "attitude": 3.0}, {"brand": "Onty 1", "divisi": "Produksi", "nama": "Novita Sari", "skor": 3.7, "performance": 4.0, "disiplin": 3.0, "teamwork": 4.0, "inisiatif": 4.0, "attitude": 3.0}, {"brand": "Onty 1", "divisi": "Produksi", "nama": "Muhammad Zarkasi", "skor": 3.7, "performance": 4.0, "disiplin": 4.0, "teamwork": 3.0, "inisiatif": 3.0, "attitude": 4.0}, {"brand": "Onty 1", "divisi": "Produksi", "nama": "Marirotul Mada In", "skor": 3.7, "performance": 4.0, "disiplin": 3.0, "teamwork": 4.0, "inisiatif": 4.0, "attitude": 3.0}, {"brand": "Onty 1", "divisi": "Produksi", "nama": "Adi Pratomo", "skor": 3.7, "performance": 4.0, "disiplin": 3.0, "teamwork": 4.0, "inisiatif": 4.0, "attitude": 3.0}, {"brand": "Onty 2", "divisi": "Kasir, Waiters & CS", "nama": "Adira Fairizkuna", "skor": 3.7, "performance": 4.0, "disiplin": 3.0, "teamwork": 4.0, "inisiatif": 4.0, "attitude": 3.0}, {"brand": "Onty 1", "divisi": "Produksi", "nama": "Sri Puji Astuti", "skor": 3.8, "performance": 4.0, "disiplin": 4.0, "teamwork": 4.0, "inisiatif": 3.0, "attitude": 3.0}, {"brand": "Onty 1", "divisi": "Produksi", "nama": "Indra Kharisma", "skor": 3.8, "performance": 4.0, "disiplin": 3.0, "teamwork": 4.0, "inisiatif": 4.0, "attitude": 4.0}, {"brand": "Onty 1", "divisi": "Kasir & CS", "nama": "Tatia Cahyarani", "skor": 3.8, "performance": 4.0, "disiplin": 4.0, "teamwork": 3.0, "inisiatif": 4.0, "attitude": 4.0}, {"brand": "Onty 1", "divisi": "Kasir & CS", "nama": "Maratussani", "skor": 3.8, "performance": 4.0, "disiplin": 4.0, "teamwork": 3.0, "inisiatif": 4.0, "attitude": 4.0}, {"brand": "Onty 1", "divisi": "Office", "nama": "M. Rafandika Widjaja Putra", "skor": 3.8, "performance": 4.0, "disiplin": 3.0, "teamwork": 4.0, "inisiatif": 4.0, "attitude": 4.0}, {"brand": "Onty 2", "divisi": "Kasir, Waiters & CS", "nama": "Mila Noviani", "skor": 3.8, "performance": 4.0, "disiplin": 3.0, "teamwork": 4.0, "inisiatif": 4.0, "attitude": 4.0}, {"brand": "Onty 2", "divisi": "Kasir, Waiters & CS", "nama": "Nabilla Neza Ramadhina", "skor": 3.8, "performance": 4.0, "disiplin": 3.0, "teamwork": 4.0, "inisiatif": 4.0, "attitude": 4.0}, {"brand": "Onty 2", "divisi": "Kasir, Waiters & CS", "nama": "Wulan Rahmadani", "skor": 3.8, "performance": 4.0, "disiplin": 3.0, "teamwork": 4.0, "inisiatif": 4.0, "attitude": 4.0}, {"brand": "Onty 2", "divisi": "Kasir, Waiters & CS", "nama": "Ayu Alivia", "skor": 3.8, "performance": 4.0, "disiplin": 3.0, "teamwork": 4.0, "inisiatif": 4.0, "attitude": 4.0}, {"brand": "Onty 2", "divisi": "Kasir, Waiters & CS", "nama": "Ahmad Zaenal Muzaky", "skor": 3.8, "performance": 4.0, "disiplin": 4.0, "teamwork": 4.0, "inisiatif": 3.0, "attitude": 3.0}, {"brand": "Onty 2", "divisi": "Kasir, Waiters & CS", "nama": "Rizki", "skor": 3.8, "performance": 4.0, "disiplin": 3.0, "teamwork": 4.0, "inisiatif": 4.0, "attitude": 4.0}, {"brand": "Onty 2", "divisi": "Dapur", "nama": "Imam Fathoni", "skor": 3.8, "performance": 4.0, "disiplin": 4.0, "teamwork": 3.0, "inisiatif": 4.0, "attitude": 4.0}, {"brand": "Onty 2", "divisi": "Kasir, Waiters & CS", "nama": "Sefiani", "skor": 3.84, "performance": 4.0, "disiplin": 3.0, "teamwork": 4.0, "inisiatif": 4.4, "attitude": 4.0}, {"brand": "Onty 1", "divisi": "Produksi", "nama": "Hary Sumaryanto", "skor": 3.9, "performance": 4.0, "disiplin": 4.0, "teamwork": 4.0, "inisiatif": 4.0, "attitude": 3.0}, {"brand": "Onty 1", "divisi": "Produksi", "nama": "Muhammad Firmansyah", "skor": 3.9, "performance": 4.0, "disiplin": 4.0, "teamwork": 4.0, "inisiatif": 4.0, "attitude": 3.0}, {"brand": "Onty 1", "divisi": "Office", "nama": "Moch Muslih Maulana", "skor": 3.9, "performance": 4.0, "disiplin": 4.0, "teamwork": 4.0, "inisiatif": 3.0, "attitude": 4.0}, {"brand": "Onty 2", "divisi": "Produksi", "nama": "Ainayatul Munawaroh", "skor": 3.9, "performance": 4.0, "disiplin": 4.0, "teamwork": 4.0, "inisiatif": 3.0, "attitude": 4.0}, {"brand": "Onty 2", "divisi": "Kasir, Waiters & CS", "nama": "Nada Tsurayya", "skor": 3.9, "performance": 4.0, "disiplin": 4.0, "teamwork": 4.0, "inisiatif": 4.0, "attitude": 3.0}, {"brand": "Onty 2", "divisi": "Kasir, Waiters & CS", "nama": "Nisa Latifah", "skor": 3.9, "performance": 4.0, "disiplin": 4.0, "teamwork": 4.0, "inisiatif": 4.0, "attitude": 3.0}, {"brand": "Onty 2", "divisi": "Kasir, Waiters & CS", "nama": "Miska Ramadhani", "skor": 3.9, "performance": 4.0, "disiplin": 4.0, "teamwork": 4.0, "inisiatif": 3.0, "attitude": 4.0}, {"brand": "Onty 2", "divisi": "Dapur", "nama": "Muva", "skor": 3.9, "performance": 4.0, "disiplin": 4.0, "teamwork": 4.0, "inisiatif": 3.0, "attitude": 4.0}, {"brand": "Onty 2", "divisi": "Dapur", "nama": "Ahmad Arya Mundawi", "skor": 3.9, "performance": 4.0, "disiplin": 4.0, "teamwork": 4.0, "inisiatif": 3.0, "attitude": 4.0}, {"brand": "Onty 2", "divisi": "Dapur", "nama": "Icha Lestary", "skor": 3.9, "performance": 4.0, "disiplin": 4.0, "teamwork": 4.0, "inisiatif": 3.0, "attitude": 4.0}, {"brand": "Onty 1", "divisi": "Office", "nama": "Kurniatika", "skor": 4.0, "performance": 4.0, "disiplin": 4.0, "teamwork": 4.0, "inisiatif": 4.0, "attitude": 4.0}, {"brand": "Onty 1", "divisi": "Office", "nama": "Umi Fadhilah", "skor": 4.0, "performance": 4.0, "disiplin": 4.0, "teamwork": 4.0, "inisiatif": 4.0, "attitude": 4.0}, {"brand": "Onty 2", "divisi": "Produksi", "nama": "Fita Arisma", "skor": 4.0, "performance": 4.0, "disiplin": 4.0, "teamwork": 4.0, "inisiatif": 4.0, "attitude": 4.0}, {"brand": "Onty 2", "divisi": "Produksi", "nama": "Candra Aji Pratomo", "skor": 4.0, "performance": 4.0, "disiplin": 4.0, "teamwork": 4.0, "inisiatif": 4.0, "attitude": 4.0}, {"brand": "Onty 2", "divisi": "Kasir, Waiters & CS", "nama": "Dwi Wulan", "skor": 4.0, "performance": 4.0, "disiplin": 4.0, "teamwork": 4.0, "inisiatif": 4.0, "attitude": 4.0}, {"brand": "Onty 2", "divisi": "Kasir, Waiters & CS", "nama": "Zaki Annan", "skor": 4.0, "performance": 4.0, "disiplin": 4.0, "teamwork": 4.0, "inisiatif": 4.0, "attitude": 4.0}, {"brand": "Onty 2", "divisi": "Kasir, Waiters & CS", "nama": "Ahmad Falasofi", "skor": 4.0, "performance": 4.0, "disiplin": 4.0, "teamwork": 4.0, "inisiatif": 4.0, "attitude": 4.0}, {"brand": "Onty 2", "divisi": "Kasir, Waiters & CS", "nama": "Restu Vianita", "skor": 4.0, "performance": 4.0, "disiplin": 4.0, "teamwork": 4.0, "inisiatif": 4.0, "attitude": 4.0}, {"brand": "Onty 2", "divisi": "Kasir, Waiters & CS", "nama": "Ayu Puji Lestari", "skor": 4.0, "performance": 4.0, "disiplin": 4.0, "teamwork": 4.0, "inisiatif": 4.0, "attitude": 4.0}, {"brand": "Onty 2", "divisi": "Kasir, Waiters & CS", "nama": "Krismanto", "skor": 4.0, "performance": 4.0, "disiplin": 4.0, "teamwork": 4.0, "inisiatif": 4.0, "attitude": 4.0}, {"brand": "Onty 2", "divisi": "Kasir, Waiters & CS", "nama": "Muhammad Faisal", "skor": 4.0, "performance": 4.0, "disiplin": 4.0, "teamwork": 4.0, "inisiatif": 4.0, "attitude": 4.0}, {"brand": "Onty 2", "divisi": "Kasir, Waiters & CS", "nama": "Nifa Juanita", "skor": 4.0, "performance": 4.0, "disiplin": 4.0, "teamwork": 4.0, "inisiatif": 4.0, "attitude": 4.0}, {"brand": "Onty 1", "divisi": "Office", "nama": "Novia volvo", "skor": 4.2, "performance": 4.0, "disiplin": 4.0, "teamwork": 5.0, "inisiatif": 4.0, "attitude": 4.0}, {"brand": "Onty 1", "divisi": "Office", "nama": "Fara Nabila", "skor": 4.2, "performance": 4.0, "disiplin": 5.0, "teamwork": 4.0, "inisiatif": 4.0, "attitude": 4.0}, {"brand": "Onty 2", "divisi": "Dapur", "nama": "Syifani", "skor": 4.3, "performance": 4.0, "disiplin": 5.0, "teamwork": 5.0, "inisiatif": 4.0, "attitude": 3.0}, {"brand": "Onty 1", "divisi": "Office", "nama": "Angger Tri Nursanti", "skor": 4.6, "performance": 5.0, "disiplin": 5.0, "teamwork": 4.0, "inisiatif": 4.0, "attitude": 4.0}, {"brand": "Onty 1", "divisi": "Office", "nama": "Tsalisa Mazidah", "skor": 4.8, "performance": 5.0, "disiplin": 5.0, "teamwork": 5.0, "inisiatif": 4.0, "attitude": 4.0}, {"brand": "Onty 1", "divisi": "Office", "nama": "Wulan Septiani Putri", "skor": 4.9, "performance": 5.0, "disiplin": 5.0, "teamwork": 5.0, "inisiatif": 5.0, "attitude": 4.0}, {"brand": "Onty 1", "divisi": "Office", "nama": "Riyanto", "skor": 5.0, "performance": 5.0, "disiplin": 5.0, "teamwork": 5.0, "inisiatif": 5.0, "attitude": 5.0}], "big_decliners": [{"brand": "Onty 1", "divisi": "Produksi", "nama": "Farid Awalludin", "bulan_tersedia": ["Maret", "April", "Mei", "Juni"], "skor_per_bulan": {"Juni": 3.0, "Mei": 3.2, "April": 4.4, "Maret": 5.0}, "rata_rata": 3.9, "trend": -2.0, "jumlah_penilaian": 4}, {"brand": "Onty 1", "divisi": "Produksi", "nama": "Romi Abdul Karim", "bulan_tersedia": ["Maret", "April", "Mei", "Juni"], "skor_per_bulan": {"Juni": 3.4, "Mei": 3.6, "April": 4.2, "Maret": 5.0}, "rata_rata": 4.05, "trend": -1.6, "jumlah_penilaian": 4}, {"brand": "Onty 1", "divisi": "Produksi", "nama": "Rio Ardi Saputra", "bulan_tersedia": ["Maret", "April", "Mei", "Juni"], "skor_per_bulan": {"Juni": 3.4, "Mei": 3.0, "April": 4.2, "Maret": 5.0}, "rata_rata": 3.9, "trend": -1.6, "jumlah_penilaian": 4}, {"brand": "Onty 1", "divisi": "Produksi", "nama": "Muhamad Firman Ardiansyah", "bulan_tersedia": ["Maret", "April", "Mei"], "skor_per_bulan": {"Mei": 3.4, "April": 4.0, "Maret": 5.0}, "rata_rata": 4.13, "trend": -1.6, "jumlah_penilaian": 3}, {"brand": "Onty 2", "divisi": "Kasir, Waiters & CS", "nama": "Nur Fiana", "bulan_tersedia": ["Maret", "April", "Mei", "Juni"], "skor_per_bulan": {"Juni": 3.4, "Mei": 4.0, "April": 4.0, "Maret": 5.0}, "rata_rata": 4.1, "trend": -1.6, "jumlah_penilaian": 4}, {"brand": "Onty 2", "divisi": "Dapur", "nama": "M Danil Abdani Syakur", "bulan_tersedia": ["Maret", "April", "Juni"], "skor_per_bulan": {"Juni": 3.4, "April": 5.0, "Maret": 5.0}, "rata_rata": 4.47, "trend": -1.6, "jumlah_penilaian": 3}, {"brand": "Onty 1", "divisi": "Produksi", "nama": "Nur Khamida", "bulan_tersedia": ["Maret", "April", "Mei", "Juni"], "skor_per_bulan": {"Juni": 3.5, "Mei": 3.4, "April": 3.8, "Maret": 5.0}, "rata_rata": 3.92, "trend": -1.5, "jumlah_penilaian": 4}, {"brand": "Onty 1", "divisi": "Produksi", "nama": "Suwandani", "bulan_tersedia": ["Maret", "April", "Mei", "Juni"], "skor_per_bulan": {"Juni": 2.6, "Mei": 2.5, "April": 3.4, "Maret": 4.0}, "rata_rata": 3.12, "trend": -1.4, "jumlah_penilaian": 4}, {"brand": "Onty 1", "divisi": "Produksi", "nama": "Sri Yuniarti", "bulan_tersedia": ["Maret", "April", "Mei", "Juni"], "skor_per_bulan": {"Juni": 3.6, "Mei": 3.7, "April": 4.0, "Maret": 5.0}, "rata_rata": 4.08, "trend": -1.4, "jumlah_penilaian": 4}, {"brand": "Onty 1", "divisi": "Produksi", "nama": "Tri Sulistianingdyah", "bulan_tersedia": ["Maret", "April", "Mei", "Juni"], "skor_per_bulan": {"Juni": 3.6, "Mei": 4.0, "April": 5.0, "Maret": 5.0}, "rata_rata": 4.4, "trend": -1.4, "jumlah_penilaian": 4}, {"brand": "Onty 2", "divisi": "Kasir, Waiters & CS", "nama": "Tasya Novitasari", "bulan_tersedia": ["Maret", "April", "Mei", "Juni"], "skor_per_bulan": {"Juni": 3.0, "Mei": 3.2, "April": 3.1, "Maret": 4.4}, "rata_rata": 3.43, "trend": -1.4, "jumlah_penilaian": 4}, {"brand": "Onty 1", "divisi": "Produksi", "nama": "Muhammad Zarkasi", "bulan_tersedia": ["Maret", "April", "Mei", "Juni"], "skor_per_bulan": {"Juni": 3.7, "Mei": 3.9, "April": 4.4, "Maret": 5.0}, "rata_rata": 4.25, "trend": -1.3, "jumlah_penilaian": 4}, {"brand": "Onty 2", "divisi": "Kasir, Waiters & CS", "nama": "Riska Amelia", "bulan_tersedia": ["Maret", "April", "Mei", "Juni"], "skor_per_bulan": {"Juni": 3.16, "Mei": 3.9, "April": 3.6, "Maret": 4.4}, "rata_rata": 3.77, "trend": -1.24, "jumlah_penilaian": 4}, {"brand": "Onty 1", "divisi": "Produksi", "nama": "Rikhma Aini", "bulan_tersedia": ["Maret", "April", "Mei", "Juni"], "skor_per_bulan": {"Juni": 2.8, "Mei": 3.0, "April": 3.4, "Maret": 4.0}, "rata_rata": 3.3, "trend": -1.2, "jumlah_penilaian": 4}, {"brand": "Onty 1", "divisi": "Produksi", "nama": "Sri Puji Astuti", "bulan_tersedia": ["Maret", "April", "Mei", "Juni"], "skor_per_bulan": {"Juni": 3.8, "Mei": 4.2, "April": 5.0, "Maret": 5.0}, "rata_rata": 4.5, "trend": -1.2, "jumlah_penilaian": 4}, {"brand": "Onty 1", "divisi": "Produksi", "nama": "M Mahfud", "bulan_tersedia": ["Maret", "April", "Mei", "Juni"], "skor_per_bulan": {"Juni": 2.8, "Mei": 3.0, "April": 4.0, "Maret": 4.0}, "rata_rata": 3.45, "trend": -1.2, "jumlah_penilaian": 4}, {"brand": "Onty 2", "divisi": "Kasir, Waiters & CS", "nama": "Nabilla Neza Ramadhina", "bulan_tersedia": ["Maret", "April", "Mei", "Juni"], "skor_per_bulan": {"Juni": 3.8, "Mei": 3.8, "April": 4.1, "Maret": 5.0}, "rata_rata": 4.17, "trend": -1.2, "jumlah_penilaian": 4}, {"brand": "Onty 2", "divisi": "Kasir, Waiters & CS", "nama": "Wulan Rahmadani", "bulan_tersedia": ["Maret", "April", "Mei", "Juni"], "skor_per_bulan": {"Juni": 3.8, "Mei": 3.8, "April": 4.1, "Maret": 5.0}, "rata_rata": 4.17, "trend": -1.2, "jumlah_penilaian": 4}, {"brand": "Onty 2", "divisi": "Kasir, Waiters & CS", "nama": "Ahmad Zaenal Muzaky", "bulan_tersedia": ["Maret", "April", "Mei", "Juni"], "skor_per_bulan": {"Juni": 3.8, "Mei": 3.4, "April": 4.1, "Maret": 5.0}, "rata_rata": 4.08, "trend": -1.2, "jumlah_penilaian": 4}, {"brand": "Onty 1", "divisi": "Produksi", "nama": "Muhammad Firmansyah", "bulan_tersedia": ["Maret", "April", "Mei", "Juni"], "skor_per_bulan": {"Juni": 3.9, "Mei": 3.8, "April": 4.2, "Maret": 5.0}, "rata_rata": 4.22, "trend": -1.1, "jumlah_penilaian": 4}, {"brand": "Onty 2", "divisi": "Kasir, Waiters & CS", "nama": "Nisa Latifah", "bulan_tersedia": ["Maret", "April", "Mei", "Juni"], "skor_per_bulan": {"Juni": 3.9, "Mei": 3.9, "April": 4.1, "Maret": 5.0}, "rata_rata": 4.22, "trend": -1.1, "jumlah_penilaian": 4}, {"brand": "Onty 2", "divisi": "Kasir, Waiters & CS", "nama": "Adira Fairizkuna", "bulan_tersedia": ["Maret", "April", "Mei", "Juni"], "skor_per_bulan": {"Juni": 3.7, "Mei": 3.7, "April": 3.6, "Maret": 4.8}, "rata_rata": 3.95, "trend": -1.1, "jumlah_penilaian": 4}, {"brand": "Onty 1", "divisi": "Produksi", "nama": "Achmad Reza Tinuva", "bulan_tersedia": ["Maret", "April", "Mei"], "skor_per_bulan": {"Mei": 3.0, "April": 3.8, "Maret": 4.0}, "rata_rata": 3.6, "trend": -1.0, "jumlah_penilaian": 3}, {"brand": "Onty 2", "divisi": "Kasir, Waiters & CS", "nama": "Mila Noviani", "bulan_tersedia": ["Maret", "Mei", "Juni"], "skor_per_bulan": {"Juni": 3.8, "Mei": 3.8, "Maret": 4.8}, "rata_rata": 4.13, "trend": -1.0, "jumlah_penilaian": 3}, {"brand": "Onty 2", "divisi": "Kasir, Waiters & CS", "nama": "Ayu Puji Lestari", "bulan_tersedia": ["Maret", "April", "Mei", "Juni"], "skor_per_bulan": {"Juni": 4.0, "Mei": 4.0, "April": 4.1, "Maret": 5.0}, "rata_rata": 4.28, "trend": -1.0, "jumlah_penilaian": 4}, {"brand": "Onty 2", "divisi": "Kasir, Waiters & CS", "nama": "Krismanto", "bulan_tersedia": ["Maret", "April", "Mei", "Juni"], "skor_per_bulan": {"Juni": 4.0, "Mei": 4.0, "April": 4.9, "Maret": 5.0}, "rata_rata": 4.47, "trend": -1.0, "jumlah_penilaian": 4}], "individu_diagnostic": [{"brand": "Onty 1", "divisi": "Produksi", "nama": "Nur Khamida", "skor_terakhir": 3.5, "bulan_terakhir": "Juni", "rata_rata": 3.92, "status": "Menurun", "perubahan": -1.5, "kpi_terlemah": "Performance", "nilai_terlemah": 3.0, "kpi_terbaik": "Disiplin", "nilai_terbaik": 4.0, "kategori_aksi": "Wellbeing Check", "rekomendasi": "Cek beban kerja & kondisi kenyamanan (indikasi kelelahan/burnout meski skor masih oke). Ngobrol 1-on-1 santai, bukan tekanan tambahan. Perkuat komponen Performance pelan-pelan."}, {"brand": "Onty 1", "divisi": "Produksi", "nama": "Suwandani", "skor_terakhir": 2.6, "bulan_terakhir": "Juni", "rata_rata": 3.12, "status": "Menurun", "perubahan": -1.4, "kpi_terlemah": "Performance", "nilai_terlemah": 2.0, "kpi_terbaik": "Disiplin", "nilai_terbaik": 3.0, "kategori_aksi": "Coaching Prioritas", "rekomendasi": "Coaching intensif fokus Performance: Refresh training teknis & SOP kerja, pairing dengan mentor senior untuk tingkatkan kualitas & ketepatan waktu hasil kerja."}, {"brand": "Onty 1", "divisi": "Produksi", "nama": "Sri Yuniarti", "skor_terakhir": 3.6, "bulan_terakhir": "Juni", "rata_rata": 4.08, "status": "Menurun", "perubahan": -1.4, "kpi_terlemah": "Disiplin", "nilai_terlemah": 2.0, "kpi_terbaik": "Performance", "nilai_terbaik": 4.0, "kategori_aksi": "Wellbeing Check", "rekomendasi": "Cek beban kerja & kondisi kenyamanan (indikasi kelelahan/burnout meski skor masih oke). Ngobrol 1-on-1 santai, bukan tekanan tambahan. Perkuat komponen Disiplin pelan-pelan."}, {"brand": "Onty 1", "divisi": "Produksi", "nama": "Vina Jazalatun Nikmah", "skor_terakhir": 3.7, "bulan_terakhir": "Juni", "rata_rata": 3.75, "status": "Menurun", "perubahan": -0.3, "kpi_terlemah": "Disiplin", "nilai_terlemah": 3.0, "kpi_terbaik": "Performance", "nilai_terbaik": 4.0, "kategori_aksi": "Wellbeing Check", "rekomendasi": "Cek beban kerja & kondisi kenyamanan (indikasi kelelahan/burnout meski skor masih oke). Ngobrol 1-on-1 santai, bukan tekanan tambahan. Perkuat komponen Disiplin pelan-pelan."}, {"brand": "Onty 1", "divisi": "Produksi", "nama": "Tri Sulistianingdyah", "skor_terakhir": 3.6, "bulan_terakhir": "Juni", "rata_rata": 4.4, "status": "Menurun", "perubahan": -1.4, "kpi_terlemah": "Teamwork", "nilai_terlemah": 3.0, "kpi_terbaik": "Performance", "nilai_terbaik": 4.0, "kategori_aksi": "Wellbeing Check", "rekomendasi": "Cek beban kerja & kondisi kenyamanan (indikasi kelelahan/burnout meski skor masih oke). Ngobrol 1-on-1 santai, bukan tekanan tambahan. Perkuat komponen Teamwork pelan-pelan."}, {"brand": "Onty 1", "divisi": "Produksi", "nama": "Achmad Syafiq Al Bassya", "skor_terakhir": 3.7, "bulan_terakhir": "Juni", "rata_rata": 3.6, "status": "Menurun", "perubahan": -0.3, "kpi_terlemah": "Teamwork", "nilai_terlemah": 3.0, "kpi_terbaik": "Performance", "nilai_terbaik": 4.0, "kategori_aksi": "Wellbeing Check", "rekomendasi": "Cek beban kerja & kondisi kenyamanan (indikasi kelelahan/burnout meski skor masih oke). Ngobrol 1-on-1 santai, bukan tekanan tambahan. Perkuat komponen Teamwork pelan-pelan."}, {"brand": "Onty 1", "divisi": "Produksi", "nama": "Hary Sumaryanto", "skor_terakhir": 3.9, "bulan_terakhir": "Juni", "rata_rata": 3.75, "status": "Meningkat", "perubahan": 0.3, "kpi_terlemah": "Attitude", "nilai_terlemah": 3.0, "kpi_terbaik": "Performance", "nilai_terbaik": 4.0, "kategori_aksi": "Apresiasi & Lanjutkan", "rekomendasi": "Tren positif \u2014 beri apresiasi/pengakuan agar termotivasi lanjut, tetap dukung sisi Attitude yang masih relatif lemah."}, {"brand": "Onty 1", "divisi": "Produksi", "nama": "Novita Sari", "skor_terakhir": 3.7, "bulan_terakhir": "Juni", "rata_rata": 3.9, "status": "Menurun", "perubahan": -0.3, "kpi_terlemah": "Disiplin", "nilai_terlemah": 3.0, "kpi_terbaik": "Performance", "nilai_terbaik": 4.0, "kategori_aksi": "Wellbeing Check", "rekomendasi": "Cek beban kerja & kondisi kenyamanan (indikasi kelelahan/burnout meski skor masih oke). Ngobrol 1-on-1 santai, bukan tekanan tambahan. Perkuat komponen Disiplin pelan-pelan."}, {"brand": "Onty 1", "divisi": "Produksi", "nama": "Slamet rozikin", "skor_terakhir": 3.6, "bulan_terakhir": "Juni", "rata_rata": 3.95, "status": "Menurun", "perubahan": -0.4, "kpi_terlemah": "Disiplin", "nilai_terlemah": 3.0, "kpi_terbaik": "Performance", "nilai_terbaik": 4.0, "kategori_aksi": "Wellbeing Check", "rekomendasi": "Cek beban kerja & kondisi kenyamanan (indikasi kelelahan/burnout meski skor masih oke). Ngobrol 1-on-1 santai, bukan tekanan tambahan. Perkuat komponen Disiplin pelan-pelan."}, {"brand": "Onty 1", "divisi": "Produksi", "nama": "Alvina Puspitasari", "skor_terakhir": 3.4, "bulan_terakhir": "Juni", "rata_rata": 3.6, "status": "Menurun", "perubahan": -0.4, "kpi_terlemah": "Disiplin", "nilai_terlemah": 2.0, "kpi_terbaik": "Performance", "nilai_terbaik": 4.0, "kategori_aksi": "Wellbeing Check", "rekomendasi": "Cek beban kerja & kondisi kenyamanan (indikasi kelelahan/burnout meski skor masih oke). Ngobrol 1-on-1 santai, bukan tekanan tambahan. Perkuat komponen Disiplin pelan-pelan."}, {"brand": "Onty 1", "divisi": "Produksi", "nama": "Riska Amalia", "skor_terakhir": 3.0, "bulan_terakhir": "Juni", "rata_rata": 3.05, "status": "Stagnan", "perubahan": -0.1, "kpi_terlemah": "Teamwork", "nilai_terlemah": 2.0, "kpi_terbaik": "Disiplin", "nilai_terbaik": 4.0, "kategori_aksi": "Dorongan Target", "rekomendasi": "Belum ada kemajuan berarti \u2014 beri dorongan target kecil bulanan pada Teamwork: Ikutkan sesi team building & rotasi kerja tim kecil agar terbiasa kolaborasi lintas rekan/shift."}, {"brand": "Onty 1", "divisi": "Produksi", "nama": "Muhammad Zarkasi", "skor_terakhir": 3.7, "bulan_terakhir": "Juni", "rata_rata": 4.25, "status": "Menurun", "perubahan": -1.3, "kpi_terlemah": "Teamwork", "nilai_terlemah": 3.0, "kpi_terbaik": "Performance", "nilai_terbaik": 4.0, "kategori_aksi": "Wellbeing Check", "rekomendasi": "Cek beban kerja & kondisi kenyamanan (indikasi kelelahan/burnout meski skor masih oke). Ngobrol 1-on-1 santai, bukan tekanan tambahan. Perkuat komponen Teamwork pelan-pelan."}, {"brand": "Onty 1", "divisi": "Produksi", "nama": "Rikhma Aini", "skor_terakhir": 2.8, "bulan_terakhir": "Juni", "rata_rata": 3.3, "status": "Menurun", "perubahan": -1.2, "kpi_terlemah": "Disiplin", "nilai_terlemah": 2.0, "kpi_terbaik": "Performance", "nilai_terbaik": 3.0, "kategori_aksi": "Coaching Prioritas", "rekomendasi": "Coaching intensif fokus Disiplin: Pendampingan kedisiplinan: kesepakatan jam kerja tertulis, reminder harian, evaluasi mingguan singkat dengan atasan langsung."}, {"brand": "Onty 1", "divisi": "Produksi", "nama": "Romi Abdul Karim", "skor_terakhir": 3.4, "bulan_terakhir": "Juni", "rata_rata": 4.05, "status": "Menurun", "perubahan": -1.6, "kpi_terlemah": "Disiplin", "nilai_terlemah": 3.0, "kpi_terbaik": "Performance", "nilai_terbaik": 4.0, "kategori_aksi": "Wellbeing Check", "rekomendasi": "Cek beban kerja & kondisi kenyamanan (indikasi kelelahan/burnout meski skor masih oke). Ngobrol 1-on-1 santai, bukan tekanan tambahan. Perkuat komponen Disiplin pelan-pelan."}, {"brand": "Onty 1", "divisi": "Produksi", "nama": "Muhammad Firmansyah", "skor_terakhir": 3.9, "bulan_terakhir": "Juni", "rata_rata": 4.22, "status": "Menurun", "perubahan": -1.1, "kpi_terlemah": "Attitude", "nilai_terlemah": 3.0, "kpi_terbaik": "Performance", "nilai_terbaik": 4.0, "kategori_aksi": "Wellbeing Check", "rekomendasi": "Cek beban kerja & kondisi kenyamanan (indikasi kelelahan/burnout meski skor masih oke). Ngobrol 1-on-1 santai, bukan tekanan tambahan. Perkuat komponen Attitude pelan-pelan."}, {"brand": "Onty 1", "divisi": "Produksi", "nama": "Ika Nur Aini", "skor_terakhir": 3.0, "bulan_terakhir": "Juni", "rata_rata": 3.23, "status": "Stagnan", "perubahan": 0.0, "kpi_terlemah": "Performance", "nilai_terlemah": 3.0, "kpi_terbaik": "Performance", "nilai_terbaik": 3.0, "kategori_aksi": "Dorongan Target", "rekomendasi": "Belum ada kemajuan berarti \u2014 beri dorongan target kecil bulanan pada Performance: Refresh training teknis & SOP kerja, pairing dengan mentor senior untuk tingkatkan kualitas & ketepatan waktu hasil kerja."}, {"brand": "Onty 1", "divisi": "Produksi", "nama": "Rio Ardi Saputra", "skor_terakhir": 3.4, "bulan_terakhir": "Juni", "rata_rata": 3.9, "status": "Menurun", "perubahan": -1.6, "kpi_terlemah": "Disiplin", "nilai_terlemah": 3.0, "kpi_terbaik": "Performance", "nilai_terbaik": 4.0, "kategori_aksi": "Wellbeing Check", "rekomendasi": "Cek beban kerja & kondisi kenyamanan (indikasi kelelahan/burnout meski skor masih oke). Ngobrol 1-on-1 santai, bukan tekanan tambahan. Perkuat komponen Disiplin pelan-pelan."}, {"brand": "Onty 1", "divisi": "Produksi", "nama": "Marirotul Mada In", "skor_terakhir": 3.7, "bulan_terakhir": "Juni", "rata_rata": 3.98, "status": "Menurun", "perubahan": -0.3, "kpi_terlemah": "Disiplin", "nilai_terlemah": 3.0, "kpi_terbaik": "Performance", "nilai_terbaik": 4.0, "kategori_aksi": "Wellbeing Check", "rekomendasi": "Cek beban kerja & kondisi kenyamanan (indikasi kelelahan/burnout meski skor masih oke). Ngobrol 1-on-1 santai, bukan tekanan tambahan. Perkuat komponen Disiplin pelan-pelan."}, {"brand": "Onty 1", "divisi": "Produksi", "nama": "Prayogo Pangestu", "skor_terakhir": 3.6, "bulan_terakhir": "Juni", "rata_rata": 4.07, "status": "Menurun", "perubahan": -0.4, "kpi_terlemah": "Disiplin", "nilai_terlemah": 3.0, "kpi_terbaik": "Performance", "nilai_terbaik": 4.0, "kategori_aksi": "Wellbeing Check", "rekomendasi": "Cek beban kerja & kondisi kenyamanan (indikasi kelelahan/burnout meski skor masih oke). Ngobrol 1-on-1 santai, bukan tekanan tambahan. Perkuat komponen Disiplin pelan-pelan."}, {"brand": "Onty 1", "divisi": "Produksi", "nama": "Satria Riantiarno", "skor_terakhir": 3.0, "bulan_terakhir": "Juni", "rata_rata": 3.35, "status": "Menurun", "perubahan": -0.7, "kpi_terlemah": "Performance", "nilai_terlemah": 3.0, "kpi_terbaik": "Performance", "nilai_terbaik": 3.0, "kategori_aksi": "Coaching Prioritas", "rekomendasi": "Coaching intensif fokus Performance: Refresh training teknis & SOP kerja, pairing dengan mentor senior untuk tingkatkan kualitas & ketepatan waktu hasil kerja."}, {"brand": "Onty 1", "divisi": "Produksi", "nama": "Muchammad Lukmanul Adib", "skor_terakhir": 3.6, "bulan_terakhir": "Juni", "rata_rata": 3.73, "status": "Menurun", "perubahan": -0.4, "kpi_terlemah": "Disiplin", "nilai_terlemah": 3.0, "kpi_terbaik": "Performance", "nilai_terbaik": 4.0, "kategori_aksi": "Wellbeing Check", "rekomendasi": "Cek beban kerja & kondisi kenyamanan (indikasi kelelahan/burnout meski skor masih oke). Ngobrol 1-on-1 santai, bukan tekanan tambahan. Perkuat komponen Disiplin pelan-pelan."}, {"brand": "Onty 1", "divisi": "Produksi", "nama": "Farid Awalludin", "skor_terakhir": 3.0, "bulan_terakhir": "Juni", "rata_rata": 3.9, "status": "Menurun", "perubahan": -2.0, "kpi_terlemah": "Performance", "nilai_terlemah": 3.0, "kpi_terbaik": "Performance", "nilai_terbaik": 3.0, "kategori_aksi": "Wellbeing Check", "rekomendasi": "Cek beban kerja & kondisi kenyamanan (indikasi kelelahan/burnout meski skor masih oke). Ngobrol 1-on-1 santai, bukan tekanan tambahan. Perkuat komponen Performance pelan-pelan."}, {"brand": "Onty 1", "divisi": "Produksi", "nama": "Sri Puji Astuti", "skor_terakhir": 3.8, "bulan_terakhir": "Juni", "rata_rata": 4.5, "status": "Menurun", "perubahan": -1.2, "kpi_terlemah": "Inisiatif", "nilai_terlemah": 3.0, "kpi_terbaik": "Performance", "nilai_terbaik": 4.0, "kategori_aksi": "Wellbeing Check", "rekomendasi": "Cek beban kerja & kondisi kenyamanan (indikasi kelelahan/burnout meski skor masih oke). Ngobrol 1-on-1 santai, bukan tekanan tambahan. Perkuat komponen Inisiatif pelan-pelan."}, {"brand": "Onty 1", "divisi": "Produksi", "nama": "M Mahfud", "skor_terakhir": 2.8, "bulan_terakhir": "Juni", "rata_rata": 3.45, "status": "Menurun", "perubahan": -1.2, "kpi_terlemah": "Disiplin", "nilai_terlemah": 2.0, "kpi_terbaik": "Performance", "nilai_terbaik": 3.0, "kategori_aksi": "Coaching Prioritas", "rekomendasi": "Coaching intensif fokus Disiplin: Pendampingan kedisiplinan: kesepakatan jam kerja tertulis, reminder harian, evaluasi mingguan singkat dengan atasan langsung."}, {"brand": "Onty 1", "divisi": "Produksi", "nama": "M Ilzamul Khusni", "skor_terakhir": 3.6, "bulan_terakhir": "Juni", "rata_rata": 3.55, "status": "Stagnan", "perubahan": 0.1, "kpi_terlemah": "Performance", "nilai_terlemah": 3.0, "kpi_terbaik": "Disiplin", "nilai_terbaik": 4.0, "kategori_aksi": "Dorongan Target", "rekomendasi": "Belum ada kemajuan berarti \u2014 beri dorongan target kecil bulanan pada Performance: Refresh training teknis & SOP kerja, pairing dengan mentor senior untuk tingkatkan kualitas & ketepatan waktu hasil kerja."}, {"brand": "Onty 1", "divisi": "Produksi", "nama": "Fais Angga Kurniawan", "skor_terakhir": 3.6, "bulan_terakhir": "Juni", "rata_rata": 3.8, "status": "Menurun", "perubahan": -0.4, "kpi_terlemah": "Teamwork", "nilai_terlemah": 3.0, "kpi_terbaik": "Performance", "nilai_terbaik": 4.0, "kategori_aksi": "Wellbeing Check", "rekomendasi": "Cek beban kerja & kondisi kenyamanan (indikasi kelelahan/burnout meski skor masih oke). Ngobrol 1-on-1 santai, bukan tekanan tambahan. Perkuat komponen Teamwork pelan-pelan."}, {"brand": "Onty 1", "divisi": "Produksi", "nama": "Triwitanto", "skor_terakhir": 3.5, "bulan_terakhir": "Juni", "rata_rata": 3.35, "status": "Meningkat", "perubahan": 0.3, "kpi_terlemah": "Disiplin", "nilai_terlemah": 3.0, "kpi_terbaik": "Performance", "nilai_terbaik": 4.0, "kategori_aksi": "Apresiasi & Lanjutkan", "rekomendasi": "Tren positif \u2014 beri apresiasi/pengakuan agar termotivasi lanjut, tetap dukung sisi Disiplin yang masih relatif lemah."}, {"brand": "Onty 1", "divisi": "Produksi", "nama": "Adi Pratomo", "skor_terakhir": 3.7, "bulan_terakhir": "Juni", "rata_rata": 3.65, "status": "Stagnan", "perubahan": 0.1, "kpi_terlemah": "Disiplin", "nilai_terlemah": 3.0, "kpi_terbaik": "Performance", "nilai_terbaik": 4.0, "kategori_aksi": "Dorongan Target", "rekomendasi": "Belum ada kemajuan berarti \u2014 beri dorongan target kecil bulanan pada Disiplin: Pendampingan kedisiplinan: kesepakatan jam kerja tertulis, reminder harian, evaluasi mingguan singkat dengan atasan langsung."}, {"brand": "Onty 1", "divisi": "Produksi", "nama": "Indra Kharisma", "skor_terakhir": 3.8, "bulan_terakhir": "Juni", "rata_rata": 3.9, "status": "Stagnan", "perubahan": -0.2, "kpi_terlemah": "Disiplin", "nilai_terlemah": 3.0, "kpi_terbaik": "Performance", "nilai_terbaik": 4.0, "kategori_aksi": "Dorongan Target", "rekomendasi": "Belum ada kemajuan berarti \u2014 beri dorongan target kecil bulanan pada Disiplin: Pendampingan kedisiplinan: kesepakatan jam kerja tertulis, reminder harian, evaluasi mingguan singkat dengan atasan langsung."}, {"brand": "Onty 1", "divisi": "Kasir & CS", "nama": "Lulu Hamidah", "skor_terakhir": 3.0, "bulan_terakhir": "Juni", "rata_rata": 3.3, "status": "Menurun", "perubahan": -0.7, "kpi_terlemah": "Teamwork", "nilai_terlemah": 2.0, "kpi_terbaik": "Disiplin", "nilai_terbaik": 4.0, "kategori_aksi": "Coaching Prioritas", "rekomendasi": "Coaching intensif fokus Teamwork: Ikutkan sesi team building & rotasi kerja tim kecil agar terbiasa kolaborasi lintas rekan/shift."}, {"brand": "Onty 1", "divisi": "Kasir & CS", "nama": "Dewi Masyitoh", "skor_terakhir": 3.5, "bulan_terakhir": "Juni", "rata_rata": 3.6, "status": "Menurun", "perubahan": -0.5, "kpi_terlemah": "Performance", "nilai_terlemah": 3.0, "kpi_terbaik": "Disiplin", "nilai_terbaik": 4.0, "kategori_aksi": "Wellbeing Check", "rekomendasi": "Cek beban kerja & kondisi kenyamanan (indikasi kelelahan/burnout meski skor masih oke). Ngobrol 1-on-1 santai, bukan tekanan tambahan. Perkuat komponen Performance pelan-pelan."}, {"brand": "Onty 1", "divisi": "Kasir & CS", "nama": "Tatia Cahyarani", "skor_terakhir": 3.8, "bulan_terakhir": "Juni", "rata_rata": 3.95, "status": "Menurun", "perubahan": -0.3, "kpi_terlemah": "Teamwork", "nilai_terlemah": 3.0, "kpi_terbaik": "Performance", "nilai_terbaik": 4.0, "kategori_aksi": "Wellbeing Check", "rekomendasi": "Cek beban kerja & kondisi kenyamanan (indikasi kelelahan/burnout meski skor masih oke). Ngobrol 1-on-1 santai, bukan tekanan tambahan. Perkuat komponen Teamwork pelan-pelan."}, {"brand": "Onty 1", "divisi": "Kasir & CS", "nama": "Maratussani", "skor_terakhir": 3.8, "bulan_terakhir": "Juni", "rata_rata": 3.85, "status": "Menurun", "perubahan": -0.3, "kpi_terlemah": "Teamwork", "nilai_terlemah": 3.0, "kpi_terbaik": "Performance", "nilai_terbaik": 4.0, "kategori_aksi": "Wellbeing Check", "rekomendasi": "Cek beban kerja & kondisi kenyamanan (indikasi kelelahan/burnout meski skor masih oke). Ngobrol 1-on-1 santai, bukan tekanan tambahan. Perkuat komponen Teamwork pelan-pelan."}, {"brand": "Onty 1", "divisi": "Kasir & CS", "nama": "Mustika Yuniar", "skor_terakhir": 2.8, "bulan_terakhir": "Juni", "rata_rata": 3.15, "status": "Menurun", "perubahan": -0.8, "kpi_terlemah": "Teamwork", "nilai_terlemah": 2.0, "kpi_terbaik": "Performance", "nilai_terbaik": 3.0, "kategori_aksi": "Coaching Prioritas", "rekomendasi": "Coaching intensif fokus Teamwork: Ikutkan sesi team building & rotasi kerja tim kecil agar terbiasa kolaborasi lintas rekan/shift."}, {"brand": "Onty 1", "divisi": "Kasir & CS", "nama": "Dwi Apriliana Anggini", "skor_terakhir": 3.1, "bulan_terakhir": "Juni", "rata_rata": 3.12, "status": "Stagnan", "perubahan": -0.2, "kpi_terlemah": "Performance", "nilai_terlemah": 3.0, "kpi_terbaik": "Attitude", "nilai_terbaik": 4.0, "kategori_aksi": "Dorongan Target", "rekomendasi": "Belum ada kemajuan berarti \u2014 beri dorongan target kecil bulanan pada Performance: Refresh training teknis & SOP kerja, pairing dengan mentor senior untuk tingkatkan kualitas & ketepatan waktu hasil kerja."}, {"brand": "Onty 1", "divisi": "Kasir & CS", "nama": "Qoni Atuzzahra", "skor_terakhir": 3.1, "bulan_terakhir": "Juni", "rata_rata": 3.4, "status": "Stagnan", "perubahan": -0.1, "kpi_terlemah": "Performance", "nilai_terlemah": 3.0, "kpi_terbaik": "Attitude", "nilai_terbaik": 4.0, "kategori_aksi": "Dorongan Target", "rekomendasi": "Belum ada kemajuan berarti \u2014 beri dorongan target kecil bulanan pada Performance: Refresh training teknis & SOP kerja, pairing dengan mentor senior untuk tingkatkan kualitas & ketepatan waktu hasil kerja."}, {"brand": "Onty 1", "divisi": "Kasir & CS", "nama": "Marta Difa Aulia", "skor_terakhir": 3.5, "bulan_terakhir": "Juni", "rata_rata": 3.85, "status": "Menurun", "perubahan": -0.4, "kpi_terlemah": "Performance", "nilai_terlemah": 3.0, "kpi_terbaik": "Disiplin", "nilai_terbaik": 4.0, "kategori_aksi": "Wellbeing Check", "rekomendasi": "Cek beban kerja & kondisi kenyamanan (indikasi kelelahan/burnout meski skor masih oke). Ngobrol 1-on-1 santai, bukan tekanan tambahan. Perkuat komponen Performance pelan-pelan."}, {"brand": "Onty 1", "divisi": "Kasir & CS", "nama": "Maya Fitria Wati", "skor_terakhir": 3.1, "bulan_terakhir": "Juni", "rata_rata": 3.77, "status": "Menurun", "perubahan": -0.9, "kpi_terlemah": "Performance", "nilai_terlemah": 3.0, "kpi_terbaik": "Inisiatif", "nilai_terbaik": 4.0, "kategori_aksi": "Wellbeing Check", "rekomendasi": "Cek beban kerja & kondisi kenyamanan (indikasi kelelahan/burnout meski skor masih oke). Ngobrol 1-on-1 santai, bukan tekanan tambahan. Perkuat komponen Performance pelan-pelan."}, {"brand": "Onty 1", "divisi": "Kasir & CS", "nama": "Belgis", "skor_terakhir": 3.2, "bulan_terakhir": "Juni", "rata_rata": 3.2, "status": "Data Baru", "perubahan": null, "kpi_terlemah": "Inisiatif", "nilai_terlemah": 2.0, "kpi_terbaik": "Disiplin", "nilai_terbaik": 4.0, "kategori_aksi": "Monitoring Awal", "rekomendasi": "Baru 1x dinilai \u2014 pastikan orientasi & ekspektasi kerja jelas, pantau bulan depan. Sisi Inisiatif perlu jadi perhatian awal."}, {"brand": "Onty 1", "divisi": "Produksi", "nama": "Muhamad Firman Ardiansyah", "skor_terakhir": 3.4, "bulan_terakhir": "Mei", "rata_rata": 4.13, "status": "Menurun", "perubahan": -1.6, "kpi_terlemah": "Disiplin", "nilai_terlemah": 3.0, "kpi_terbaik": "Performance", "nilai_terbaik": 4.0, "kategori_aksi": "Wellbeing Check", "rekomendasi": "Cek beban kerja & kondisi kenyamanan (indikasi kelelahan/burnout meski skor masih oke). Ngobrol 1-on-1 santai, bukan tekanan tambahan. Perkuat komponen Disiplin pelan-pelan."}, {"brand": "Onty 1", "divisi": "Produksi", "nama": "Achmad Reza Tinuva", "skor_terakhir": 3.0, "bulan_terakhir": "Mei", "rata_rata": 3.6, "status": "Menurun", "perubahan": -1.0, "kpi_terlemah": "Performance", "nilai_terlemah": 3.0, "kpi_terbaik": "Performance", "nilai_terbaik": 3.0, "kategori_aksi": "Wellbeing Check", "rekomendasi": "Cek beban kerja & kondisi kenyamanan (indikasi kelelahan/burnout meski skor masih oke). Ngobrol 1-on-1 santai, bukan tekanan tambahan. Perkuat komponen Performance pelan-pelan."}, {"brand": "Onty 1", "divisi": "Office", "nama": "Riyanto", "skor_terakhir": 5.0, "bulan_terakhir": "Juni", "rata_rata": 5.0, "status": "Stagnan", "perubahan": 0.0, "kpi_terlemah": "Performance", "nilai_terlemah": 5.0, "kpi_terbaik": "Performance", "nilai_terbaik": 5.0, "kategori_aksi": "Jalur Pengembangan", "rekomendasi": "Sudah solid & konsisten \u2014 beri jalur pengembangan (delegasi tugas baru, calon mentor/leader kecil, upskilling) agar tidak jenuh."}, {"brand": "Onty 1", "divisi": "Office", "nama": "Novia volvo", "skor_terakhir": 4.2, "bulan_terakhir": "Juni", "rata_rata": 4.4, "status": "Menurun", "perubahan": -0.6, "kpi_terlemah": "Performance", "nilai_terlemah": 4.0, "kpi_terbaik": "Teamwork", "nilai_terbaik": 5.0, "kategori_aksi": "Wellbeing Check", "rekomendasi": "Cek beban kerja & kondisi kenyamanan (indikasi kelelahan/burnout meski skor masih oke). Ngobrol 1-on-1 santai, bukan tekanan tambahan. Perkuat komponen Performance pelan-pelan."}, {"brand": "Onty 1", "divisi": "Office", "nama": "Moch Muslih Maulana", "skor_terakhir": 3.9, "bulan_terakhir": "Juni", "rata_rata": 3.97, "status": "Stagnan", "perubahan": -0.2, "kpi_terlemah": "Inisiatif", "nilai_terlemah": 3.0, "kpi_terbaik": "Performance", "nilai_terbaik": 4.0, "kategori_aksi": "Dorongan Target", "rekomendasi": "Belum ada kemajuan berarti \u2014 beri dorongan target kecil bulanan pada Inisiatif: Ikutkan program 'Ide Onty' (usulan perbaikan proses), beri 1 tanggung jawab kecil di luar rutinitas untuk melatih ownership."}, {"brand": "Onty 1", "divisi": "Office", "nama": "Fara Nabila", "skor_terakhir": 4.2, "bulan_terakhir": "Juni", "rata_rata": 4.33, "status": "Menurun", "perubahan": -0.4, "kpi_terlemah": "Performance", "nilai_terlemah": 4.0, "kpi_terbaik": "Disiplin", "nilai_terbaik": 5.0, "kategori_aksi": "Wellbeing Check", "rekomendasi": "Cek beban kerja & kondisi kenyamanan (indikasi kelelahan/burnout meski skor masih oke). Ngobrol 1-on-1 santai, bukan tekanan tambahan. Perkuat komponen Performance pelan-pelan."}, {"brand": "Onty 1", "divisi": "Office", "nama": "Tsalisa Mazidah", "skor_terakhir": 4.8, "bulan_terakhir": "Juni", "rata_rata": 4.8, "status": "Stagnan", "perubahan": 0.0, "kpi_terlemah": "Inisiatif", "nilai_terlemah": 4.0, "kpi_terbaik": "Performance", "nilai_terbaik": 5.0, "kategori_aksi": "Jalur Pengembangan", "rekomendasi": "Sudah solid & konsisten \u2014 beri jalur pengembangan (delegasi tugas baru, calon mentor/leader kecil, upskilling) agar tidak jenuh."}, {"brand": "Onty 1", "divisi": "Office", "nama": "Angger Tri Nursanti", "skor_terakhir": 4.6, "bulan_terakhir": "Juni", "rata_rata": 4.73, "status": "Menurun", "perubahan": -0.4, "kpi_terlemah": "Teamwork", "nilai_terlemah": 4.0, "kpi_terbaik": "Performance", "nilai_terbaik": 5.0, "kategori_aksi": "Wellbeing Check", "rekomendasi": "Cek beban kerja & kondisi kenyamanan (indikasi kelelahan/burnout meski skor masih oke). Ngobrol 1-on-1 santai, bukan tekanan tambahan. Perkuat komponen Teamwork pelan-pelan."}, {"brand": "Onty 1", "divisi": "Office", "nama": "M. Rafandika Widjaja Putra", "skor_terakhir": 3.8, "bulan_terakhir": "Juni", "rata_rata": 4.0, "status": "Menurun", "perubahan": -0.6, "kpi_terlemah": "Disiplin", "nilai_terlemah": 3.0, "kpi_terbaik": "Performance", "nilai_terbaik": 4.0, "kategori_aksi": "Wellbeing Check", "rekomendasi": "Cek beban kerja & kondisi kenyamanan (indikasi kelelahan/burnout meski skor masih oke). Ngobrol 1-on-1 santai, bukan tekanan tambahan. Perkuat komponen Disiplin pelan-pelan."}, {"brand": "Onty 1", "divisi": "Office", "nama": "Kurniatika", "skor_terakhir": 4.0, "bulan_terakhir": "Juni", "rata_rata": 4.03, "status": "Stagnan", "perubahan": -0.1, "kpi_terlemah": "Performance", "nilai_terlemah": 4.0, "kpi_terbaik": "Performance", "nilai_terbaik": 4.0, "kategori_aksi": "Jalur Pengembangan", "rekomendasi": "Sudah solid & konsisten \u2014 beri jalur pengembangan (delegasi tugas baru, calon mentor/leader kecil, upskilling) agar tidak jenuh."}, {"brand": "Onty 1", "divisi": "Office", "nama": "Umi Fadhilah", "skor_terakhir": 4.0, "bulan_terakhir": "Juni", "rata_rata": 4.1, "status": "Menurun", "perubahan": -0.3, "kpi_terlemah": "Performance", "nilai_terlemah": 4.0, "kpi_terbaik": "Performance", "nilai_terbaik": 4.0, "kategori_aksi": "Wellbeing Check", "rekomendasi": "Cek beban kerja & kondisi kenyamanan (indikasi kelelahan/burnout meski skor masih oke). Ngobrol 1-on-1 santai, bukan tekanan tambahan. Perkuat komponen Performance pelan-pelan."}, {"brand": "Onty 1", "divisi": "Office", "nama": "Wulan Septiani Putri", "skor_terakhir": 4.9, "bulan_terakhir": "Juni", "rata_rata": 4.9, "status": "Stagnan", "perubahan": 0.0, "kpi_terlemah": "Attitude", "nilai_terlemah": 4.0, "kpi_terbaik": "Performance", "nilai_terbaik": 5.0, "kategori_aksi": "Jalur Pengembangan", "rekomendasi": "Sudah solid & konsisten \u2014 beri jalur pengembangan (delegasi tugas baru, calon mentor/leader kecil, upskilling) agar tidak jenuh."}, {"brand": "Onty 1", "divisi": "Kasir & CS", "nama": "Saraswati", "skor_terakhir": 3.2, "bulan_terakhir": "Mei", "rata_rata": 3.47, "status": "Menurun", "perubahan": -0.5, "kpi_terlemah": "Performance", "nilai_terlemah": 3.0, "kpi_terbaik": "Disiplin", "nilai_terbaik": 4.0, "kategori_aksi": "Coaching Prioritas", "rekomendasi": "Coaching intensif fokus Performance: Refresh training teknis & SOP kerja, pairing dengan mentor senior untuk tingkatkan kualitas & ketepatan waktu hasil kerja."}, {"brand": "Onty 1", "divisi": "Produksi", "nama": "Farda Somita", "skor_terakhir": 4.4, "bulan_terakhir": "April", "rata_rata": 4.7, "status": "Menurun", "perubahan": -0.6, "kpi_terlemah": "Performance", "nilai_terlemah": 4.0, "kpi_terbaik": "Teamwork", "nilai_terbaik": 5.0, "kategori_aksi": "Wellbeing Check", "rekomendasi": "Cek beban kerja & kondisi kenyamanan (indikasi kelelahan/burnout meski skor masih oke). Ngobrol 1-on-1 santai, bukan tekanan tambahan. Perkuat komponen Performance pelan-pelan."}, {"brand": "Onty 1", "divisi": "Produksi", "nama": "Moh Okky Mabruri", "skor_terakhir": 4.2, "bulan_terakhir": "April", "rata_rata": 4.6, "status": "Menurun", "perubahan": -0.8, "kpi_terlemah": "Performance", "nilai_terlemah": 4.0, "kpi_terbaik": "Inisiatif", "nilai_terbaik": 5.0, "kategori_aksi": "Wellbeing Check", "rekomendasi": "Cek beban kerja & kondisi kenyamanan (indikasi kelelahan/burnout meski skor masih oke). Ngobrol 1-on-1 santai, bukan tekanan tambahan. Perkuat komponen Performance pelan-pelan."}, {"brand": "Onty 1", "divisi": "Produksi", "nama": "Ainayatul Munawaroh", "skor_terakhir": 5.0, "bulan_terakhir": "April", "rata_rata": 5.0, "status": "Stagnan", "perubahan": 0.0, "kpi_terlemah": "Performance", "nilai_terlemah": 5.0, "kpi_terbaik": "Performance", "nilai_terbaik": 5.0, "kategori_aksi": "Jalur Pengembangan", "rekomendasi": "Sudah solid & konsisten \u2014 beri jalur pengembangan (delegasi tugas baru, calon mentor/leader kecil, upskilling) agar tidak jenuh."}, {"brand": "Onty 1", "divisi": "Produksi", "nama": "Aisha Ardelia Ariani", "skor_terakhir": 4.8, "bulan_terakhir": "April", "rata_rata": 4.4, "status": "Meningkat", "perubahan": 0.8, "kpi_terlemah": "Inisiatif", "nilai_terlemah": 4.0, "kpi_terbaik": "Performance", "nilai_terbaik": 5.0, "kategori_aksi": "Apresiasi & Lanjutkan", "rekomendasi": "Tren positif \u2014 beri apresiasi/pengakuan agar termotivasi lanjut, tetap dukung sisi Inisiatif yang masih relatif lemah."}, {"brand": "Onty 1", "divisi": "Produksi", "nama": "Desy Nadia Lutfi", "skor_terakhir": 4.6, "bulan_terakhir": "April", "rata_rata": 4.3, "status": "Meningkat", "perubahan": 0.6, "kpi_terlemah": "Disiplin", "nilai_terlemah": 4.0, "kpi_terbaik": "Performance", "nilai_terbaik": 5.0, "kategori_aksi": "Apresiasi & Lanjutkan", "rekomendasi": "Tren positif \u2014 beri apresiasi/pengakuan agar termotivasi lanjut, tetap dukung sisi Disiplin yang masih relatif lemah."}, {"brand": "Onty 2", "divisi": "Produksi", "nama": "Fita Arisma", "skor_terakhir": 4.0, "bulan_terakhir": "Juni", "rata_rata": 4.27, "status": "Stagnan", "perubahan": -0.2, "kpi_terlemah": "Performance", "nilai_terlemah": 4.0, "kpi_terbaik": "Performance", "nilai_terbaik": 4.0, "kategori_aksi": "Jalur Pengembangan", "rekomendasi": "Sudah solid & konsisten \u2014 beri jalur pengembangan (delegasi tugas baru, calon mentor/leader kecil, upskilling) agar tidak jenuh."}, {"brand": "Onty 2", "divisi": "Produksi", "nama": "Candra Aji Pratomo", "skor_terakhir": 4.0, "bulan_terakhir": "Juni", "rata_rata": 4.27, "status": "Menurun", "perubahan": -0.4, "kpi_terlemah": "Performance", "nilai_terlemah": 4.0, "kpi_terbaik": "Performance", "nilai_terbaik": 4.0, "kategori_aksi": "Wellbeing Check", "rekomendasi": "Cek beban kerja & kondisi kenyamanan (indikasi kelelahan/burnout meski skor masih oke). Ngobrol 1-on-1 santai, bukan tekanan tambahan. Perkuat komponen Performance pelan-pelan."}, {"brand": "Onty 2", "divisi": "Produksi", "nama": "Ratna Wahyu Ardhiani", "skor_terakhir": 2.8, "bulan_terakhir": "Juni", "rata_rata": 3.07, "status": "Stagnan", "perubahan": -0.2, "kpi_terlemah": "Disiplin", "nilai_terlemah": 2.0, "kpi_terbaik": "Performance", "nilai_terbaik": 3.0, "kategori_aksi": "Dorongan Target", "rekomendasi": "Belum ada kemajuan berarti \u2014 beri dorongan target kecil bulanan pada Disiplin: Pendampingan kedisiplinan: kesepakatan jam kerja tertulis, reminder harian, evaluasi mingguan singkat dengan atasan langsung."}, {"brand": "Onty 2", "divisi": "Produksi", "nama": "Maulana Yusuf", "skor_terakhir": 2.5, "bulan_terakhir": "Juni", "rata_rata": 3.1, "status": "Menurun", "perubahan": -0.9, "kpi_terlemah": "Disiplin", "nilai_terlemah": 2.0, "kpi_terbaik": "Performance", "nilai_terbaik": 3.0, "kategori_aksi": "Coaching Prioritas", "rekomendasi": "Coaching intensif fokus Disiplin: Pendampingan kedisiplinan: kesepakatan jam kerja tertulis, reminder harian, evaluasi mingguan singkat dengan atasan langsung."}, {"brand": "Onty 2", "divisi": "Produksi", "nama": "Hamzah Nur Zein", "skor_terakhir": 3.0, "bulan_terakhir": "Juni", "rata_rata": 3.37, "status": "Menurun", "perubahan": -0.5, "kpi_terlemah": "Performance", "nilai_terlemah": 3.0, "kpi_terbaik": "Performance", "nilai_terbaik": 3.0, "kategori_aksi": "Coaching Prioritas", "rekomendasi": "Coaching intensif fokus Performance: Refresh training teknis & SOP kerja, pairing dengan mentor senior untuk tingkatkan kualitas & ketepatan waktu hasil kerja."}, {"brand": "Onty 2", "divisi": "Produksi", "nama": "Nur Laela", "skor_terakhir": 3.0, "bulan_terakhir": "Juni", "rata_rata": 3.33, "status": "Stagnan", "perubahan": -0.2, "kpi_terlemah": "Performance", "nilai_terlemah": 3.0, "kpi_terbaik": "Performance", "nilai_terbaik": 3.0, "kategori_aksi": "Dorongan Target", "rekomendasi": "Belum ada kemajuan berarti \u2014 beri dorongan target kecil bulanan pada Performance: Refresh training teknis & SOP kerja, pairing dengan mentor senior untuk tingkatkan kualitas & ketepatan waktu hasil kerja."}, {"brand": "Onty 2", "divisi": "Produksi", "nama": "Kholishin", "skor_terakhir": 3.4, "bulan_terakhir": "Juni", "rata_rata": 3.63, "status": "Menurun", "perubahan": -0.3, "kpi_terlemah": "Disiplin", "nilai_terlemah": 3.0, "kpi_terbaik": "Performance", "nilai_terbaik": 4.0, "kategori_aksi": "Wellbeing Check", "rekomendasi": "Cek beban kerja & kondisi kenyamanan (indikasi kelelahan/burnout meski skor masih oke). Ngobrol 1-on-1 santai, bukan tekanan tambahan. Perkuat komponen Disiplin pelan-pelan."}, {"brand": "Onty 2", "divisi": "Produksi", "nama": "Putri Handayani", "skor_terakhir": 3.4, "bulan_terakhir": "Juni", "rata_rata": 3.53, "status": "Stagnan", "perubahan": 0.1, "kpi_terlemah": "Disiplin", "nilai_terlemah": 3.0, "kpi_terbaik": "Performance", "nilai_terbaik": 4.0, "kategori_aksi": "Dorongan Target", "rekomendasi": "Belum ada kemajuan berarti \u2014 beri dorongan target kecil bulanan pada Disiplin: Pendampingan kedisiplinan: kesepakatan jam kerja tertulis, reminder harian, evaluasi mingguan singkat dengan atasan langsung."}, {"brand": "Onty 2", "divisi": "Produksi", "nama": "Eko Nurdiyanto", "skor_terakhir": 2.6, "bulan_terakhir": "Juni", "rata_rata": 3.03, "status": "Menurun", "perubahan": -0.5, "kpi_terlemah": "Disiplin", "nilai_terlemah": 2.0, "kpi_terbaik": "Performance", "nilai_terbaik": 3.0, "kategori_aksi": "Coaching Prioritas", "rekomendasi": "Coaching intensif fokus Disiplin: Pendampingan kedisiplinan: kesepakatan jam kerja tertulis, reminder harian, evaluasi mingguan singkat dengan atasan langsung."}, {"brand": "Onty 2", "divisi": "Produksi", "nama": "Ainayatul Munawaroh", "skor_terakhir": 3.9, "bulan_terakhir": "Juni", "rata_rata": 3.9, "status": "Stagnan", "perubahan": 0.0, "kpi_terlemah": "Inisiatif", "nilai_terlemah": 3.0, "kpi_terbaik": "Performance", "nilai_terbaik": 4.0, "kategori_aksi": "Dorongan Target", "rekomendasi": "Belum ada kemajuan berarti \u2014 beri dorongan target kecil bulanan pada Inisiatif: Ikutkan program 'Ide Onty' (usulan perbaikan proses), beri 1 tanggung jawab kecil di luar rutinitas untuk melatih ownership."}, {"brand": "Onty 2", "divisi": "Produksi", "nama": "Akmal Niam Roisi", "skor_terakhir": 3.4, "bulan_terakhir": "Juni", "rata_rata": 3.57, "status": "Stagnan", "perubahan": -0.1, "kpi_terlemah": "Disiplin", "nilai_terlemah": 3.0, "kpi_terbaik": "Performance", "nilai_terbaik": 4.0, "kategori_aksi": "Dorongan Target", "rekomendasi": "Belum ada kemajuan berarti \u2014 beri dorongan target kecil bulanan pada Disiplin: Pendampingan kedisiplinan: kesepakatan jam kerja tertulis, reminder harian, evaluasi mingguan singkat dengan atasan langsung."}, {"brand": "Onty 2", "divisi": "Produksi", "nama": "Triantoro Haristian", "skor_terakhir": 3.0, "bulan_terakhir": "Juni", "rata_rata": 3.53, "status": "Menurun", "perubahan": -0.8, "kpi_terlemah": "Performance", "nilai_terlemah": 3.0, "kpi_terbaik": "Performance", "nilai_terbaik": 3.0, "kategori_aksi": "Coaching Prioritas", "rekomendasi": "Coaching intensif fokus Performance: Refresh training teknis & SOP kerja, pairing dengan mentor senior untuk tingkatkan kualitas & ketepatan waktu hasil kerja."}, {"brand": "Onty 2", "divisi": "Produksi", "nama": "Fajar Cahyo Priyono", "skor_terakhir": 2.6, "bulan_terakhir": "Juni", "rata_rata": 2.87, "status": "Menurun", "perubahan": -0.3, "kpi_terlemah": "Teamwork", "nilai_terlemah": 2.0, "kpi_terbaik": "Performance", "nilai_terbaik": 3.0, "kategori_aksi": "Coaching Prioritas", "rekomendasi": "Coaching intensif fokus Teamwork: Ikutkan sesi team building & rotasi kerja tim kecil agar terbiasa kolaborasi lintas rekan/shift."}, {"brand": "Onty 2", "divisi": "Produksi", "nama": "Thoit Hamzah", "skor_terakhir": 2.6, "bulan_terakhir": "Juni", "rata_rata": 2.97, "status": "Menurun", "perubahan": -0.8, "kpi_terlemah": "Disiplin", "nilai_terlemah": 2.0, "kpi_terbaik": "Performance", "nilai_terbaik": 3.0, "kategori_aksi": "Coaching Prioritas", "rekomendasi": "Coaching intensif fokus Disiplin: Pendampingan kedisiplinan: kesepakatan jam kerja tertulis, reminder harian, evaluasi mingguan singkat dengan atasan langsung."}, {"brand": "Onty 2", "divisi": "Produksi", "nama": "Aisha Ardelia Ariani", "skor_terakhir": 3.6, "bulan_terakhir": "Juni", "rata_rata": 3.75, "status": "Menurun", "perubahan": -0.3, "kpi_terlemah": "Disiplin", "nilai_terlemah": 3.0, "kpi_terbaik": "Performance", "nilai_terbaik": 4.0, "kategori_aksi": "Wellbeing Check", "rekomendasi": "Cek beban kerja & kondisi kenyamanan (indikasi kelelahan/burnout meski skor masih oke). Ngobrol 1-on-1 santai, bukan tekanan tambahan. Perkuat komponen Disiplin pelan-pelan."}, {"brand": "Onty 2", "divisi": "Produksi", "nama": "Desy Nadia Lutfi", "skor_terakhir": 3.2, "bulan_terakhir": "Juni", "rata_rata": 3.5, "status": "Menurun", "perubahan": -0.6, "kpi_terlemah": "Performance", "nilai_terlemah": 3.0, "kpi_terbaik": "Teamwork", "nilai_terbaik": 4.0, "kategori_aksi": "Coaching Prioritas", "rekomendasi": "Coaching intensif fokus Performance: Refresh training teknis & SOP kerja, pairing dengan mentor senior untuk tingkatkan kualitas & ketepatan waktu hasil kerja."}, {"brand": "Onty 2", "divisi": "Produksi", "nama": "Afan Fajrul Falah", "skor_terakhir": 3.4, "bulan_terakhir": "Juni", "rata_rata": 3.6, "status": "Stagnan", "perubahan": -0.2, "kpi_terlemah": "Disiplin", "nilai_terlemah": 3.0, "kpi_terbaik": "Performance", "nilai_terbaik": 4.0, "kategori_aksi": "Dorongan Target", "rekomendasi": "Belum ada kemajuan berarti \u2014 beri dorongan target kecil bulanan pada Disiplin: Pendampingan kedisiplinan: kesepakatan jam kerja tertulis, reminder harian, evaluasi mingguan singkat dengan atasan langsung."}, {"brand": "Onty 2", "divisi": "Produksi", "nama": "Ana Aulia", "skor_terakhir": 3.4, "bulan_terakhir": "Juni", "rata_rata": 3.57, "status": "Stagnan", "perubahan": -0.1, "kpi_terlemah": "Disiplin", "nilai_terlemah": 3.0, "kpi_terbaik": "Performance", "nilai_terbaik": 4.0, "kategori_aksi": "Dorongan Target", "rekomendasi": "Belum ada kemajuan berarti \u2014 beri dorongan target kecil bulanan pada Disiplin: Pendampingan kedisiplinan: kesepakatan jam kerja tertulis, reminder harian, evaluasi mingguan singkat dengan atasan langsung."}, {"brand": "Onty 2", "divisi": "Produksi", "nama": "Syifa Ibadillah", "skor_terakhir": 2.9, "bulan_terakhir": "Juni", "rata_rata": 3.43, "status": "Menurun", "perubahan": -0.7, "kpi_terlemah": "Inisiatif", "nilai_terlemah": 2.0, "kpi_terbaik": "Performance", "nilai_terbaik": 3.0, "kategori_aksi": "Coaching Prioritas", "rekomendasi": "Coaching intensif fokus Inisiatif: Ikutkan program 'Ide Onty' (usulan perbaikan proses), beri 1 tanggung jawab kecil di luar rutinitas untuk melatih ownership."}, {"brand": "Onty 2", "divisi": "Produksi", "nama": "M Firman Ardiansyah", "skor_terakhir": 2.9, "bulan_terakhir": "Juni", "rata_rata": 2.9, "status": "Data Baru", "perubahan": null, "kpi_terlemah": "Inisiatif", "nilai_terlemah": 2.0, "kpi_terbaik": "Performance", "nilai_terbaik": 3.0, "kategori_aksi": "Monitoring Awal", "rekomendasi": "Baru 1x dinilai \u2014 pastikan orientasi & ekspektasi kerja jelas, pantau bulan depan. Sisi Inisiatif perlu jadi perhatian awal."}, {"brand": "Onty 2", "divisi": "Produksi", "nama": "Reza Tinuva", "skor_terakhir": 2.8, "bulan_terakhir": "Juni", "rata_rata": 2.8, "status": "Data Baru", "perubahan": null, "kpi_terlemah": "Inisiatif", "nilai_terlemah": 2.0, "kpi_terbaik": "Performance", "nilai_terbaik": 3.0, "kategori_aksi": "Monitoring Awal", "rekomendasi": "Baru 1x dinilai \u2014 pastikan orientasi & ekspektasi kerja jelas, pantau bulan depan. Sisi Inisiatif perlu jadi perhatian awal."}, {"brand": "Onty 2", "divisi": "Kasir, Waiters & CS", "nama": "Mila Noviani", "skor_terakhir": 3.8, "bulan_terakhir": "Juni", "rata_rata": 4.13, "status": "Menurun", "perubahan": -1.0, "kpi_terlemah": "Disiplin", "nilai_terlemah": 3.0, "kpi_terbaik": "Performance", "nilai_terbaik": 4.0, "kategori_aksi": "Wellbeing Check", "rekomendasi": "Cek beban kerja & kondisi kenyamanan (indikasi kelelahan/burnout meski skor masih oke). Ngobrol 1-on-1 santai, bukan tekanan tambahan. Perkuat komponen Disiplin pelan-pelan."}, {"brand": "Onty 2", "divisi": "Kasir, Waiters & CS", "nama": "Dwi Wulan", "skor_terakhir": 4.0, "bulan_terakhir": "Juni", "rata_rata": 4.17, "status": "Menurun", "perubahan": -0.8, "kpi_terlemah": "Performance", "nilai_terlemah": 4.0, "kpi_terbaik": "Performance", "nilai_terbaik": 4.0, "kategori_aksi": "Wellbeing Check", "rekomendasi": "Cek beban kerja & kondisi kenyamanan (indikasi kelelahan/burnout meski skor masih oke). Ngobrol 1-on-1 santai, bukan tekanan tambahan. Perkuat komponen Performance pelan-pelan."}, {"brand": "Onty 2", "divisi": "Kasir, Waiters & CS", "nama": "Sefiani", "skor_terakhir": 3.84, "bulan_terakhir": "Juni", "rata_rata": 4.09, "status": "Menurun", "perubahan": -0.96, "kpi_terlemah": "Disiplin", "nilai_terlemah": 3.0, "kpi_terbaik": "Inisiatif", "nilai_terbaik": 4.4, "kategori_aksi": "Wellbeing Check", "rekomendasi": "Cek beban kerja & kondisi kenyamanan (indikasi kelelahan/burnout meski skor masih oke). Ngobrol 1-on-1 santai, bukan tekanan tambahan. Perkuat komponen Disiplin pelan-pelan."}, {"brand": "Onty 2", "divisi": "Kasir, Waiters & CS", "nama": "Nabilla Neza Ramadhina", "skor_terakhir": 3.8, "bulan_terakhir": "Juni", "rata_rata": 4.17, "status": "Menurun", "perubahan": -1.2, "kpi_terlemah": "Disiplin", "nilai_terlemah": 3.0, "kpi_terbaik": "Performance", "nilai_terbaik": 4.0, "kategori_aksi": "Wellbeing Check", "rekomendasi": "Cek beban kerja & kondisi kenyamanan (indikasi kelelahan/burnout meski skor masih oke). Ngobrol 1-on-1 santai, bukan tekanan tambahan. Perkuat komponen Disiplin pelan-pelan."}, {"brand": "Onty 2", "divisi": "Kasir, Waiters & CS", "nama": "Zaki Annan", "skor_terakhir": 4.0, "bulan_terakhir": "Juni", "rata_rata": 4.22, "status": "Menurun", "perubahan": -0.8, "kpi_terlemah": "Performance", "nilai_terlemah": 4.0, "kpi_terbaik": "Performance", "nilai_terbaik": 4.0, "kategori_aksi": "Wellbeing Check", "rekomendasi": "Cek beban kerja & kondisi kenyamanan (indikasi kelelahan/burnout meski skor masih oke). Ngobrol 1-on-1 santai, bukan tekanan tambahan. Perkuat komponen Performance pelan-pelan."}, {"brand": "Onty 2", "divisi": "Kasir, Waiters & CS", "nama": "Nada Tsurayya", "skor_terakhir": 3.9, "bulan_terakhir": "Juni", "rata_rata": 4.05, "status": "Menurun", "perubahan": -0.6, "kpi_terlemah": "Attitude", "nilai_terlemah": 3.0, "kpi_terbaik": "Performance", "nilai_terbaik": 4.0, "kategori_aksi": "Wellbeing Check", "rekomendasi": "Cek beban kerja & kondisi kenyamanan (indikasi kelelahan/burnout meski skor masih oke). Ngobrol 1-on-1 santai, bukan tekanan tambahan. Perkuat komponen Attitude pelan-pelan."}, {"brand": "Onty 2", "divisi": "Kasir, Waiters & CS", "nama": "Ahmad Falasofi", "skor_terakhir": 4.0, "bulan_terakhir": "Juni", "rata_rata": 4.08, "status": "Menurun", "perubahan": -0.5, "kpi_terlemah": "Performance", "nilai_terlemah": 4.0, "kpi_terbaik": "Performance", "nilai_terbaik": 4.0, "kategori_aksi": "Wellbeing Check", "rekomendasi": "Cek beban kerja & kondisi kenyamanan (indikasi kelelahan/burnout meski skor masih oke). Ngobrol 1-on-1 santai, bukan tekanan tambahan. Perkuat komponen Performance pelan-pelan."}, {"brand": "Onty 2", "divisi": "Kasir, Waiters & CS", "nama": "Wulan Rahmadani", "skor_terakhir": 3.8, "bulan_terakhir": "Juni", "rata_rata": 4.17, "status": "Menurun", "perubahan": -1.2, "kpi_terlemah": "Disiplin", "nilai_terlemah": 3.0, "kpi_terbaik": "Performance", "nilai_terbaik": 4.0, "kategori_aksi": "Wellbeing Check", "rekomendasi": "Cek beban kerja & kondisi kenyamanan (indikasi kelelahan/burnout meski skor masih oke). Ngobrol 1-on-1 santai, bukan tekanan tambahan. Perkuat komponen Disiplin pelan-pelan."}, {"brand": "Onty 2", "divisi": "Kasir, Waiters & CS", "nama": "Nisa Latifah", "skor_terakhir": 3.9, "bulan_terakhir": "Juni", "rata_rata": 4.22, "status": "Menurun", "perubahan": -1.1, "kpi_terlemah": "Attitude", "nilai_terlemah": 3.0, "kpi_terbaik": "Performance", "nilai_terbaik": 4.0, "kategori_aksi": "Wellbeing Check", "rekomendasi": "Cek beban kerja & kondisi kenyamanan (indikasi kelelahan/burnout meski skor masih oke). Ngobrol 1-on-1 santai, bukan tekanan tambahan. Perkuat komponen Attitude pelan-pelan."}, {"brand": "Onty 2", "divisi": "Kasir, Waiters & CS", "nama": "Ayu Alivia", "skor_terakhir": 3.8, "bulan_terakhir": "Juni", "rata_rata": 4.02, "status": "Menurun", "perubahan": -0.8, "kpi_terlemah": "Disiplin", "nilai_terlemah": 3.0, "kpi_terbaik": "Performance", "nilai_terbaik": 4.0, "kategori_aksi": "Wellbeing Check", "rekomendasi": "Cek beban kerja & kondisi kenyamanan (indikasi kelelahan/burnout meski skor masih oke). Ngobrol 1-on-1 santai, bukan tekanan tambahan. Perkuat komponen Disiplin pelan-pelan."}, {"brand": "Onty 2", "divisi": "Kasir, Waiters & CS", "nama": "Adira Fairizkuna", "skor_terakhir": 3.7, "bulan_terakhir": "Juni", "rata_rata": 3.95, "status": "Menurun", "perubahan": -1.1, "kpi_terlemah": "Disiplin", "nilai_terlemah": 3.0, "kpi_terbaik": "Performance", "nilai_terbaik": 4.0, "kategori_aksi": "Wellbeing Check", "rekomendasi": "Cek beban kerja & kondisi kenyamanan (indikasi kelelahan/burnout meski skor masih oke). Ngobrol 1-on-1 santai, bukan tekanan tambahan. Perkuat komponen Disiplin pelan-pelan."}, {"brand": "Onty 2", "divisi": "Kasir, Waiters & CS", "nama": "Restu Vianita", "skor_terakhir": 4.0, "bulan_terakhir": "Juni", "rata_rata": 4.15, "status": "Menurun", "perubahan": -0.8, "kpi_terlemah": "Performance", "nilai_terlemah": 4.0, "kpi_terbaik": "Performance", "nilai_terbaik": 4.0, "kategori_aksi": "Wellbeing Check", "rekomendasi": "Cek beban kerja & kondisi kenyamanan (indikasi kelelahan/burnout meski skor masih oke). Ngobrol 1-on-1 santai, bukan tekanan tambahan. Perkuat komponen Performance pelan-pelan."}, {"brand": "Onty 2", "divisi": "Kasir, Waiters & CS", "nama": "Riska Amelia", "skor_terakhir": 3.16, "bulan_terakhir": "Juni", "rata_rata": 3.77, "status": "Menurun", "perubahan": -1.24, "kpi_terlemah": "Disiplin", "nilai_terlemah": 3.0, "kpi_terbaik": "Performance", "nilai_terbaik": 3.4, "kategori_aksi": "Wellbeing Check", "rekomendasi": "Cek beban kerja & kondisi kenyamanan (indikasi kelelahan/burnout meski skor masih oke). Ngobrol 1-on-1 santai, bukan tekanan tambahan. Perkuat komponen Disiplin pelan-pelan."}, {"brand": "Onty 2", "divisi": "Kasir, Waiters & CS", "nama": "Miska Ramadhani", "skor_terakhir": 3.9, "bulan_terakhir": "Juni", "rata_rata": 3.85, "status": "Menurun", "perubahan": -0.9, "kpi_terlemah": "Inisiatif", "nilai_terlemah": 3.0, "kpi_terbaik": "Performance", "nilai_terbaik": 4.0, "kategori_aksi": "Wellbeing Check", "rekomendasi": "Cek beban kerja & kondisi kenyamanan (indikasi kelelahan/burnout meski skor masih oke). Ngobrol 1-on-1 santai, bukan tekanan tambahan. Perkuat komponen Inisiatif pelan-pelan."}, {"brand": "Onty 2", "divisi": "Kasir, Waiters & CS", "nama": "Tasya Novitasari", "skor_terakhir": 3.0, "bulan_terakhir": "Juni", "rata_rata": 3.43, "status": "Menurun", "perubahan": -1.4, "kpi_terlemah": "Performance", "nilai_terlemah": 3.0, "kpi_terbaik": "Performance", "nilai_terbaik": 3.0, "kategori_aksi": "Coaching Prioritas", "rekomendasi": "Coaching intensif fokus Performance: Refresh training teknis & SOP kerja, pairing dengan mentor senior untuk tingkatkan kualitas & ketepatan waktu hasil kerja."}, {"brand": "Onty 2", "divisi": "Kasir, Waiters & CS", "nama": "Nur Fiana", "skor_terakhir": 3.4, "bulan_terakhir": "Juni", "rata_rata": 4.1, "status": "Menurun", "perubahan": -1.6, "kpi_terlemah": "Performance", "nilai_terlemah": 3.0, "kpi_terbaik": "Teamwork", "nilai_terbaik": 4.0, "kategori_aksi": "Wellbeing Check", "rekomendasi": "Cek beban kerja & kondisi kenyamanan (indikasi kelelahan/burnout meski skor masih oke). Ngobrol 1-on-1 santai, bukan tekanan tambahan. Perkuat komponen Performance pelan-pelan."}, {"brand": "Onty 2", "divisi": "Kasir, Waiters & CS", "nama": "Ayu Puji Lestari", "skor_terakhir": 4.0, "bulan_terakhir": "Juni", "rata_rata": 4.28, "status": "Menurun", "perubahan": -1.0, "kpi_terlemah": "Performance", "nilai_terlemah": 4.0, "kpi_terbaik": "Performance", "nilai_terbaik": 4.0, "kategori_aksi": "Wellbeing Check", "rekomendasi": "Cek beban kerja & kondisi kenyamanan (indikasi kelelahan/burnout meski skor masih oke). Ngobrol 1-on-1 santai, bukan tekanan tambahan. Perkuat komponen Performance pelan-pelan."}, {"brand": "Onty 2", "divisi": "Kasir, Waiters & CS", "nama": "Ahmad Zaenal Muzaky", "skor_terakhir": 3.8, "bulan_terakhir": "Juni", "rata_rata": 4.08, "status": "Menurun", "perubahan": -1.2, "kpi_terlemah": "Inisiatif", "nilai_terlemah": 3.0, "kpi_terbaik": "Performance", "nilai_terbaik": 4.0, "kategori_aksi": "Wellbeing Check", "rekomendasi": "Cek beban kerja & kondisi kenyamanan (indikasi kelelahan/burnout meski skor masih oke). Ngobrol 1-on-1 santai, bukan tekanan tambahan. Perkuat komponen Inisiatif pelan-pelan."}, {"brand": "Onty 2", "divisi": "Kasir, Waiters & CS", "nama": "Krismanto", "skor_terakhir": 4.0, "bulan_terakhir": "Juni", "rata_rata": 4.47, "status": "Menurun", "perubahan": -1.0, "kpi_terlemah": "Performance", "nilai_terlemah": 4.0, "kpi_terbaik": "Performance", "nilai_terbaik": 4.0, "kategori_aksi": "Wellbeing Check", "rekomendasi": "Cek beban kerja & kondisi kenyamanan (indikasi kelelahan/burnout meski skor masih oke). Ngobrol 1-on-1 santai, bukan tekanan tambahan. Perkuat komponen Performance pelan-pelan."}, {"brand": "Onty 2", "divisi": "Kasir, Waiters & CS", "nama": "Muhammad Faisal", "skor_terakhir": 4.0, "bulan_terakhir": "Juni", "rata_rata": 4.33, "status": "Menurun", "perubahan": -0.8, "kpi_terlemah": "Performance", "nilai_terlemah": 4.0, "kpi_terbaik": "Performance", "nilai_terbaik": 4.0, "kategori_aksi": "Wellbeing Check", "rekomendasi": "Cek beban kerja & kondisi kenyamanan (indikasi kelelahan/burnout meski skor masih oke). Ngobrol 1-on-1 santai, bukan tekanan tambahan. Perkuat komponen Performance pelan-pelan."}, {"brand": "Onty 2", "divisi": "Kasir, Waiters & CS", "nama": "Rizki", "skor_terakhir": 3.8, "bulan_terakhir": "Juni", "rata_rata": 3.87, "status": "Stagnan", "perubahan": -0.2, "kpi_terlemah": "Disiplin", "nilai_terlemah": 3.0, "kpi_terbaik": "Performance", "nilai_terbaik": 4.0, "kategori_aksi": "Dorongan Target", "rekomendasi": "Belum ada kemajuan berarti \u2014 beri dorongan target kecil bulanan pada Disiplin: Pendampingan kedisiplinan: kesepakatan jam kerja tertulis, reminder harian, evaluasi mingguan singkat dengan atasan langsung."}, {"brand": "Onty 2", "divisi": "Kasir, Waiters & CS", "nama": "Rahma Widiyanti", "skor_terakhir": 3.5, "bulan_terakhir": "Juni", "rata_rata": 3.4, "status": "Stagnan", "perubahan": 0.2, "kpi_terlemah": "Performance", "nilai_terlemah": 3.0, "kpi_terbaik": "Disiplin", "nilai_terbaik": 4.0, "kategori_aksi": "Dorongan Target", "rekomendasi": "Belum ada kemajuan berarti \u2014 beri dorongan target kecil bulanan pada Performance: Refresh training teknis & SOP kerja, pairing dengan mentor senior untuk tingkatkan kualitas & ketepatan waktu hasil kerja."}, {"brand": "Onty 2", "divisi": "Kasir, Waiters & CS", "nama": "Nifa Juanita", "skor_terakhir": 4.0, "bulan_terakhir": "Juni", "rata_rata": 4.0, "status": "Data Baru", "perubahan": null, "kpi_terlemah": "Performance", "nilai_terlemah": 4.0, "kpi_terbaik": "Performance", "nilai_terbaik": 4.0, "kategori_aksi": "Monitoring Awal", "rekomendasi": "Baru 1x dinilai \u2014 pastikan orientasi & ekspektasi kerja jelas, pantau bulan depan. Sisi Performance perlu jadi perhatian awal."}, {"brand": "Onty 2", "divisi": "Kasir, Waiters & CS", "nama": "Dewi Sekar Arum", "skor_terakhir": 3.2, "bulan_terakhir": "Juni", "rata_rata": 3.2, "status": "Data Baru", "perubahan": null, "kpi_terlemah": "Performance", "nilai_terlemah": 3.0, "kpi_terbaik": "Disiplin", "nilai_terbaik": 4.0, "kategori_aksi": "Monitoring Awal", "rekomendasi": "Baru 1x dinilai \u2014 pastikan orientasi & ekspektasi kerja jelas, pantau bulan depan. Sisi Performance perlu jadi perhatian awal."}, {"brand": "Onty 2", "divisi": "Kasir, Waiters & CS", "nama": "M Yusuf Moerdianto", "skor_terakhir": 3.3, "bulan_terakhir": "Juni", "rata_rata": 3.3, "status": "Data Baru", "perubahan": null, "kpi_terlemah": "Performance", "nilai_terlemah": 3.0, "kpi_terbaik": "Disiplin", "nilai_terbaik": 4.0, "kategori_aksi": "Monitoring Awal", "rekomendasi": "Baru 1x dinilai \u2014 pastikan orientasi & ekspektasi kerja jelas, pantau bulan depan. Sisi Performance perlu jadi perhatian awal."}, {"brand": "Onty 2", "divisi": "Dapur", "nama": "Nur Saidah", "skor_terakhir": 3.6, "bulan_terakhir": "Juni", "rata_rata": 3.8, "status": "Menurun", "perubahan": -0.3, "kpi_terlemah": "Disiplin", "nilai_terlemah": 3.0, "kpi_terbaik": "Performance", "nilai_terbaik": 4.0, "kategori_aksi": "Wellbeing Check", "rekomendasi": "Cek beban kerja & kondisi kenyamanan (indikasi kelelahan/burnout meski skor masih oke). Ngobrol 1-on-1 santai, bukan tekanan tambahan. Perkuat komponen Disiplin pelan-pelan."}, {"brand": "Onty 2", "divisi": "Dapur", "nama": "M Danil Abdani Syakur", "skor_terakhir": 3.4, "bulan_terakhir": "Juni", "rata_rata": 4.47, "status": "Menurun", "perubahan": -1.6, "kpi_terlemah": "Performance", "nilai_terlemah": 3.0, "kpi_terbaik": "Teamwork", "nilai_terbaik": 4.0, "kategori_aksi": "Wellbeing Check", "rekomendasi": "Cek beban kerja & kondisi kenyamanan (indikasi kelelahan/burnout meski skor masih oke). Ngobrol 1-on-1 santai, bukan tekanan tambahan. Perkuat komponen Performance pelan-pelan."}, {"brand": "Onty 2", "divisi": "Dapur", "nama": "Muva", "skor_terakhir": 3.9, "bulan_terakhir": "Juni", "rata_rata": 4.17, "status": "Menurun", "perubahan": -0.4, "kpi_terlemah": "Inisiatif", "nilai_terlemah": 3.0, "kpi_terbaik": "Performance", "nilai_terbaik": 4.0, "kategori_aksi": "Wellbeing Check", "rekomendasi": "Cek beban kerja & kondisi kenyamanan (indikasi kelelahan/burnout meski skor masih oke). Ngobrol 1-on-1 santai, bukan tekanan tambahan. Perkuat komponen Inisiatif pelan-pelan."}, {"brand": "Onty 2", "divisi": "Dapur", "nama": "Nurul Safitri", "skor_terakhir": 3.6, "bulan_terakhir": "Juni", "rata_rata": 3.87, "status": "Menurun", "perubahan": -0.4, "kpi_terlemah": "Teamwork", "nilai_terlemah": 3.0, "kpi_terbaik": "Performance", "nilai_terbaik": 4.0, "kategori_aksi": "Wellbeing Check", "rekomendasi": "Cek beban kerja & kondisi kenyamanan (indikasi kelelahan/burnout meski skor masih oke). Ngobrol 1-on-1 santai, bukan tekanan tambahan. Perkuat komponen Teamwork pelan-pelan."}, {"brand": "Onty 2", "divisi": "Dapur", "nama": "Syifani", "skor_terakhir": 4.3, "bulan_terakhir": "Juni", "rata_rata": 4.7, "status": "Menurun", "perubahan": -0.6, "kpi_terlemah": "Attitude", "nilai_terlemah": 3.0, "kpi_terbaik": "Disiplin", "nilai_terbaik": 5.0, "kategori_aksi": "Wellbeing Check", "rekomendasi": "Cek beban kerja & kondisi kenyamanan (indikasi kelelahan/burnout meski skor masih oke). Ngobrol 1-on-1 santai, bukan tekanan tambahan. Perkuat komponen Attitude pelan-pelan."}, {"brand": "Onty 2", "divisi": "Dapur", "nama": "M. Dzaki Ash Shobur", "skor_terakhir": 3.3, "bulan_terakhir": "Juni", "rata_rata": 3.77, "status": "Menurun", "perubahan": -0.7, "kpi_terlemah": "Performance", "nilai_terlemah": 3.0, "kpi_terbaik": "Teamwork", "nilai_terbaik": 4.0, "kategori_aksi": "Wellbeing Check", "rekomendasi": "Cek beban kerja & kondisi kenyamanan (indikasi kelelahan/burnout meski skor masih oke). Ngobrol 1-on-1 santai, bukan tekanan tambahan. Perkuat komponen Performance pelan-pelan."}, {"brand": "Onty 2", "divisi": "Dapur", "nama": "Ahmad Arya Mundawi", "skor_terakhir": 3.9, "bulan_terakhir": "Juni", "rata_rata": 4.1, "status": "Menurun", "perubahan": -0.3, "kpi_terlemah": "Inisiatif", "nilai_terlemah": 3.0, "kpi_terbaik": "Performance", "nilai_terbaik": 4.0, "kategori_aksi": "Wellbeing Check", "rekomendasi": "Cek beban kerja & kondisi kenyamanan (indikasi kelelahan/burnout meski skor masih oke). Ngobrol 1-on-1 santai, bukan tekanan tambahan. Perkuat komponen Inisiatif pelan-pelan."}, {"brand": "Onty 2", "divisi": "Dapur", "nama": "Icha Lestary", "skor_terakhir": 3.9, "bulan_terakhir": "Juni", "rata_rata": 3.9, "status": "Data Baru", "perubahan": null, "kpi_terlemah": "Inisiatif", "nilai_terlemah": 3.0, "kpi_terbaik": "Performance", "nilai_terbaik": 4.0, "kategori_aksi": "Monitoring Awal", "rekomendasi": "Baru 1x dinilai \u2014 pastikan orientasi & ekspektasi kerja jelas, pantau bulan depan. Sisi Inisiatif perlu jadi perhatian awal."}, {"brand": "Onty 2", "divisi": "Dapur", "nama": "M Nabil", "skor_terakhir": 3.5, "bulan_terakhir": "Juni", "rata_rata": 3.5, "status": "Data Baru", "perubahan": null, "kpi_terlemah": "Performance", "nilai_terlemah": 3.0, "kpi_terbaik": "Disiplin", "nilai_terbaik": 4.0, "kategori_aksi": "Monitoring Awal", "rekomendasi": "Baru 1x dinilai \u2014 pastikan orientasi & ekspektasi kerja jelas, pantau bulan depan. Sisi Performance perlu jadi perhatian awal."}, {"brand": "Onty 2", "divisi": "Dapur", "nama": "Qurotul Aini", "skor_terakhir": 3.1, "bulan_terakhir": "Juni", "rata_rata": 3.1, "status": "Data Baru", "perubahan": null, "kpi_terlemah": "Performance", "nilai_terlemah": 3.0, "kpi_terbaik": "Attitude", "nilai_terbaik": 4.0, "kategori_aksi": "Monitoring Awal", "rekomendasi": "Baru 1x dinilai \u2014 pastikan orientasi & ekspektasi kerja jelas, pantau bulan depan. Sisi Performance perlu jadi perhatian awal."}, {"brand": "Onty 2", "divisi": "Dapur", "nama": "Abdul Aziz", "skor_terakhir": 3.3, "bulan_terakhir": "Juni", "rata_rata": 3.65, "status": "Menurun", "perubahan": -0.7, "kpi_terlemah": "Performance", "nilai_terlemah": 3.0, "kpi_terbaik": "Disiplin", "nilai_terbaik": 4.0, "kategori_aksi": "Wellbeing Check", "rekomendasi": "Cek beban kerja & kondisi kenyamanan (indikasi kelelahan/burnout meski skor masih oke). Ngobrol 1-on-1 santai, bukan tekanan tambahan. Perkuat komponen Performance pelan-pelan."}, {"brand": "Onty 2", "divisi": "Dapur", "nama": "Imam Fathoni", "skor_terakhir": 3.8, "bulan_terakhir": "Juni", "rata_rata": 3.8, "status": "Data Baru", "perubahan": null, "kpi_terlemah": "Teamwork", "nilai_terlemah": 3.0, "kpi_terbaik": "Performance", "nilai_terbaik": 4.0, "kategori_aksi": "Monitoring Awal", "rekomendasi": "Baru 1x dinilai \u2014 pastikan orientasi & ekspektasi kerja jelas, pantau bulan depan. Sisi Teamwork perlu jadi perhatian awal."}, {"brand": "Onty 2", "divisi": "Kasir, Waiters & CS", "nama": "Rio A", "skor_terakhir": 3.8, "bulan_terakhir": "Mei", "rata_rata": 3.7, "status": "Stagnan", "perubahan": 0.2, "kpi_terlemah": "Disiplin", "nilai_terlemah": 3.0, "kpi_terbaik": "Performance", "nilai_terbaik": 4.0, "kategori_aksi": "Dorongan Target", "rekomendasi": "Belum ada kemajuan berarti \u2014 beri dorongan target kecil bulanan pada Disiplin: Pendampingan kedisiplinan: kesepakatan jam kerja tertulis, reminder harian, evaluasi mingguan singkat dengan atasan langsung."}, {"brand": "Onty 2", "divisi": "Kasir, Waiters & CS", "nama": "Belgis Ayu Sarwenda", "skor_terakhir": 3.5, "bulan_terakhir": "Mei", "rata_rata": 3.4, "status": "Stagnan", "perubahan": 0.2, "kpi_terlemah": "Performance", "nilai_terlemah": 3.0, "kpi_terbaik": "Disiplin", "nilai_terbaik": 4.0, "kategori_aksi": "Dorongan Target", "rekomendasi": "Belum ada kemajuan berarti \u2014 beri dorongan target kecil bulanan pada Performance: Refresh training teknis & SOP kerja, pairing dengan mentor senior untuk tingkatkan kualitas & ketepatan waktu hasil kerja."}, {"brand": "Onty 2", "divisi": "Produksi", "nama": "Hermawan", "skor_terakhir": 4.0, "bulan_terakhir": "April", "rata_rata": 4.0, "status": "Data Baru", "perubahan": null, "kpi_terlemah": "Teamwork", "nilai_terlemah": 3.0, "kpi_terbaik": "Disiplin", "nilai_terbaik": 5.0, "kategori_aksi": "Monitoring Awal", "rekomendasi": "Baru 1x dinilai \u2014 pastikan orientasi & ekspektasi kerja jelas, pantau bulan depan. Sisi Teamwork perlu jadi perhatian awal."}, {"brand": "Onty 2", "divisi": "Produksi", "nama": "Alvina Puspitasari", "skor_terakhir": 3.8, "bulan_terakhir": "April", "rata_rata": 3.8, "status": "Data Baru", "perubahan": null, "kpi_terlemah": "Disiplin", "nilai_terlemah": 3.0, "kpi_terbaik": "Performance", "nilai_terbaik": 4.0, "kategori_aksi": "Monitoring Awal", "rekomendasi": "Baru 1x dinilai \u2014 pastikan orientasi & ekspektasi kerja jelas, pantau bulan depan. Sisi Disiplin perlu jadi perhatian awal."}, {"brand": "Onty 2", "divisi": "Produksi", "nama": "Nifa Juanita", "skor_terakhir": 3.7, "bulan_terakhir": "April", "rata_rata": 3.7, "status": "Data Baru", "perubahan": null, "kpi_terlemah": "Teamwork", "nilai_terlemah": 3.0, "kpi_terbaik": "Performance", "nilai_terbaik": 4.0, "kategori_aksi": "Monitoring Awal", "rekomendasi": "Baru 1x dinilai \u2014 pastikan orientasi & ekspektasi kerja jelas, pantau bulan depan. Sisi Teamwork perlu jadi perhatian awal."}, {"brand": "Onty 2", "divisi": "Produksi", "nama": "Riska Amalia", "skor_terakhir": 3.1, "bulan_terakhir": "April", "rata_rata": 3.1, "status": "Data Baru", "perubahan": null, "kpi_terlemah": "Inisiatif", "nilai_terlemah": 2.0, "kpi_terbaik": "Disiplin", "nilai_terbaik": 4.0, "kategori_aksi": "Monitoring Awal", "rekomendasi": "Baru 1x dinilai \u2014 pastikan orientasi & ekspektasi kerja jelas, pantau bulan depan. Sisi Inisiatif perlu jadi perhatian awal."}, {"brand": "Onty 2", "divisi": "Produksi", "nama": "Satria Riantiarno", "skor_terakhir": 3.7, "bulan_terakhir": "April", "rata_rata": 3.7, "status": "Data Baru", "perubahan": null, "kpi_terlemah": "Teamwork", "nilai_terlemah": 3.0, "kpi_terbaik": "Performance", "nilai_terbaik": 4.0, "kategori_aksi": "Monitoring Awal", "rekomendasi": "Baru 1x dinilai \u2014 pastikan orientasi & ekspektasi kerja jelas, pantau bulan depan. Sisi Teamwork perlu jadi perhatian awal."}]};

const COLORS = {
  bg: "#FBF3E6",
  panel: "#FFFFFF",
  ink: "#3A2416",
  brandDark: "#5C3A21",
  brandMid: "#8B5E3C",
  brandLight: "#C9A578",
  gold: "#E0A83A",
  cream: "#F5E6CC",
  bersyukur: "#1C4FA1",
  amanah: "#8B5E24",
  harmonis: "#1F9254",
  gemilang: "#D6291F",
  inovatif: "#6E3FA3",
  adaptif: "#1A1A1A",
  danger: "#C6402B",
  warn: "#D69323",
  good: "#2E8B57",
};

const VALUE_COLORS = [COLORS.bersyukur, COLORS.amanah, COLORS.harmonis, COLORS.gemilang, COLORS.inovatif, COLORS.adaptif];

const CAT_COLOR = {
  "Sangat Kurang": "#B23A2E",
  "Kurang": "#D6803A",
  "Cukup": "#D6B93A",
  "Baik": "#6FA85A",
  "Sangat Baik": "#2E8B57",
};

function Card({ children, style }) {
  return (
    <div style={{
      background: COLORS.panel,
      borderRadius: 14,
      border: `1px solid ${COLORS.brandLight}55`,
      boxShadow: "0 2px 10px rgba(92,58,33,0.06)",
      padding: "18px 20px",
      ...style
    }}>{children}</div>
  );
}

function Ticket({ label, value, sub, accent, trendVal }) {
  return (
    <div style={{
      background: COLORS.panel,
      borderRadius: 12,
      border: `1.5px dashed ${accent}88`,
      padding: "16px 18px",
      position: "relative",
      minWidth: 0,
    }}>
      <div style={{ fontSize: 11, letterSpacing: 1, textTransform: "uppercase", color: COLORS.brandMid, fontWeight: 700, fontFamily: "'Trebuchet MS', sans-serif" }}>{label}</div>
      <div style={{ fontSize: 30, fontWeight: 800, color: accent, marginTop: 4, fontFamily: "'Trebuchet MS', sans-serif" }}>{value}</div>
      {sub && <div style={{ fontSize: 12.5, color: COLORS.ink, opacity: 0.75, marginTop: 3 }}>{sub}</div>}
      {trendVal !== undefined && (
        <div style={{ fontSize: 12, marginTop: 6, fontWeight: 700, color: trendVal < 0 ? COLORS.danger : COLORS.good }}>
          {trendVal < 0 ? "▼" : trendVal > 0 ? "▲" : "▬"} {Math.abs(trendVal).toFixed(2)} vs Maret
        </div>
      )}
    </div>
  );
}

function SectionTitle({ eyebrow, title, desc }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 1.5, color: COLORS.gold, textTransform: "uppercase", fontFamily: "'Trebuchet MS', sans-serif" }}>{eyebrow}</div>
      <div style={{ fontSize: 20, fontWeight: 800, color: COLORS.brandDark, marginTop: 2, fontFamily: "'Trebuchet MS', sans-serif" }}>{title}</div>
      {desc && <div style={{ fontSize: 13, color: COLORS.ink, opacity: 0.7, marginTop: 3, maxWidth: 720 }}>{desc}</div>}
    </div>
  );
}

const BAHAGIA_MAP = [
  { huruf: "B", nilai: "Bersyukur", warna: COLORS.bersyukur, komponen: "Attitude", insight: "Attitude turun dari 4.52 (Mar) ke 3.48 (Jun) — rasa syukur & apresiasi terhadap lingkungan kerja perlu disegarkan." },
  { huruf: "A", nilai: "Amanah", warna: COLORS.amanah, komponen: "Disiplin", insight: "Disiplin turun paling tajam: 4.34 → 3.46. Ini komponen yang paling butuh perhatian bulan depan." },
  { huruf: "H", nilai: "Harmonis", warna: COLORS.harmonis, komponen: "Teamwork", insight: "Teamwork turun 4.44 → 3.55, terutama di divisi Produksi kedua brand." },
  { huruf: "G", nilai: "Gemilang", warna: COLORS.gemilang, komponen: "Performance", insight: "Performance paling stabil relatif (4.51 → 3.66) namun tetap tren menurun 4 bulan berturut-turut." },
  { huruf: "I", nilai: "Inovatif", warna: COLORS.inovatif, komponen: "Inisiatif", insight: "Inisiatif adalah komponen TERLEMAH di Juni (3.40) — paling butuh program dorongan ide & ownership." },
  { huruf: "A", nilai: "Adaptif", warna: COLORS.adaptif, komponen: "Konsistensi antar bulan", insight: "Skor menurun merata di hampir semua individu — mengindikasikan perlu penyesuaian sistem kerja/beban, bukan cuma personal." },
];

const MONTH_PROGRAMS = [
  {
    bulan: "Juli (rekomendasi aksi segera)",
    fokus: "Stop-the-bleeding: audit kalibrasi penilai + coaching individu skor rendah",
    aksi: [
      "HRD & Kepala Divisi kalibrasi ulang standar skor 1-5 (cek apakah Maret dinilai terlalu longgar / Juni terlalu ketat)",
      "1-on-1 coaching untuk 12 karyawan kategori 'Kurang' di Juni, prioritas Divisi Produksi (Onty 2)",
      "Investigasi beban kerja Divisi Produksi — turun paling konsisten di kedua brand",
      "Apresiasi publik (papan penghargaan) untuk 10 top performer Juni sebagai penguat nilai Bersyukur & Gemilang",
    ]
  },
  {
    bulan: "Agustus",
    fokus: "Perkuat Amanah (Disiplin) & Harmonis (Teamwork)",
    aksi: [
      "Briefing pagi rutin (5-10 menit) per shift untuk perkuat kedisiplinan & keterbukaan komunikasi tim",
      "Sistem reward kehadiran/ketepatan waktu per divisi, terutama Kasir & CS dan Produksi",
      "Team building lintas shift 1x sebulan untuk perkuat teamwork, fokus Produksi & Kasir/Waiters/CS",
    ]
  },
  {
    bulan: "September",
    fokus: "Dorong Inovatif (Inisiatif) & Gemilang (Performance)",
    aksi: [
      "Program 'Ide Onty' — kotak/kanal ide perbaikan proses, direview & diberi feedback tiap bulan",
      "Refresh training teknis sesuai SOP per divisi (produksi, dapur, kasir) untuk angkat kembali skor performance",
      "Job rotation ringan / cross-training agar karyawan lebih adaptif terhadap perubahan tugas",
    ]
  },
  {
    bulan: "Oktober (evaluasi kuartal)",
    fokus: "Review dampak program & sesuaikan struktur insentif BAHAGIA",
    aksi: [
      "Bandingkan tren Juli-Sept vs Maret-Juni: pastikan kurva berbalik naik",
      "Formalkan skema reward/punishment berbasis skor KPI konsisten lintas divisi",
      "Employee wellbeing check (survei kenyamanan kerja) untuk pastikan peningkatan skor tidak mengorbankan kesejahteraan",
    ]
  },
];

export default function Dashboard() {
  const d = DASHBOARD_DATA;
  const [brandFilter, setBrandFilter] = useState("Semua");
  const [tab, setTab] = useState("overview");
  const [searchNama, setSearchNama] = useState("");
  const [kategoriFilter, setKategoriFilter] = useState("Semua");
  const [expandedRow, setExpandedRow] = useState(null);

  const divisionOptions = useMemo(() => {
    const names = d.division_juni.map(x => x.divisi);
    if (brandFilter === "Semua") return names;
    return names.filter(n => n.includes(brandFilter));
  }, [brandFilter]);

  const filteredDivisionMonthly = useMemo(() => {
    if (brandFilter === "Semua") return d.division_monthly_series;
    return d.division_monthly_series.filter(r => r.divisi.includes(brandFilter));
  }, [brandFilter]);

  const filteredDivisionJuni = useMemo(() => {
    if (brandFilter === "Semua") return d.division_juni;
    return d.division_juni.filter(r => r.divisi.includes(brandFilter));
  }, [brandFilter]);

  const filteredJuniEmployees = useMemo(() => {
    let list = d.juni_employees;
    if (brandFilter !== "Semua") list = list.filter(e => e.brand === brandFilter);
    return list;
  }, [brandFilter]);

  const bottomEmployees = filteredJuniEmployees.slice(0, 10);
  const topEmployees = filteredJuniEmployees.slice(-10).reverse();

  const filteredDecliners = useMemo(() => {
    let list = d.big_decliners;
    if (brandFilter !== "Semua") list = list.filter(e => e.brand === brandFilter);
    return list.slice(0, 12);
  }, [brandFilter]);

  const KATEGORI_COLOR = {
    "Wellbeing Check": COLORS.bersyukur,
    "Coaching Prioritas": COLORS.danger,
    "Jalur Pengembangan": COLORS.good,
    "Dorongan Target": COLORS.warn,
    "Apresiasi & Lanjutkan": COLORS.gemilang,
    "Monitoring Awal": COLORS.inovatif,
  };

  const filteredDiagnostic = useMemo(() => {
    let list = d.individu_diagnostic || [];
    if (brandFilter !== "Semua") list = list.filter(e => e.brand === brandFilter);
    if (kategoriFilter !== "Semua") list = list.filter(e => e.kategori_aksi === kategoriFilter);
    if (searchNama.trim()) {
      const q = searchNama.trim().toLowerCase();
      list = list.filter(e => e.nama.toLowerCase().includes(q) || e.divisi.toLowerCase().includes(q));
    }
    return [...list].sort((a, b) => a.rata_rata - b.rata_rata);
  }, [brandFilter, kategoriFilter, searchNama]);

  const kategoriCounts = useMemo(() => {
    const base = d.individu_diagnostic || [];
    const scoped = brandFilter === "Semua" ? base : base.filter(e => e.brand === brandFilter);
    const counts = {};
    scoped.forEach(e => { counts[e.kategori_aksi] = (counts[e.kategori_aksi] || 0) + 1; });
    return counts;
  }, [brandFilter]);

  const marchAvg = d.monthly_overall[0].rata2;
  const juneAvg = d.monthly_overall[3].rata2;
  const overallTrend = +(juneAvg - marchAvg).toFixed(2);

  const weakestComp = [...d.monthly_component[3] ? Object.entries(d.monthly_component[3]).filter(([k]) => k !== "bulan") : []]
    .sort((a, b) => a[1] - b[1])[0];

  const compLabel = { performance: "Performance", disiplin: "Disiplin", teamwork: "Teamwork", inisiatif: "Inisiatif", attitude: "Attitude" };

  const radarData = useMemo(() => {
    const comps = ["performance", "disiplin", "teamwork", "inisiatif", "attitude"];
    return comps.map(c => {
      const row = { komponen: compLabel[c] };
      filteredDivisionJuni.forEach(dj => {
        const rd = d.division_juni_radar[dj.divisi];
        row[dj.divisi] = rd ? rd[c] : null;
      });
      return row;
    });
  }, [filteredDivisionJuni]);

  const tabBtn = (key, label) => (
    <button
      onClick={() => setTab(key)}
      style={{
        padding: "8px 16px",
        borderRadius: 999,
        border: `1.5px solid ${COLORS.brandDark}`,
        background: tab === key ? COLORS.brandDark : "transparent",
        color: tab === key ? "#fff" : COLORS.brandDark,
        fontWeight: 700,
        fontSize: 13,
        cursor: "pointer",
        fontFamily: "'Trebuchet MS', sans-serif",
      }}
    >{label}</button>
  );

  return (
    <div style={{
      background: COLORS.bg,
      minHeight: "100%",
      fontFamily: "Inter, -apple-system, 'Segoe UI', sans-serif",
      color: COLORS.ink,
      padding: "0 0 40px 0",
    }}>
      {/* HERO */}
      <div style={{
        background: `linear-gradient(135deg, ${COLORS.brandDark}, ${COLORS.brandMid})`,
        borderBottom: `6px solid ${COLORS.gold}`,
        padding: "28px 28px 22px 28px",
        color: "#fff",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap", justifyContent: "space-between" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{
                width: 44, height: 44, borderRadius: "50%", background: COLORS.brandDark,
                border: `2px solid ${COLORS.gold}`, display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "'Brush Script MT', cursive", fontStyle: "italic", fontSize: 18
              }}>Onty</div>
              <div>
                <div style={{ fontSize: 22, fontWeight: 800, fontFamily: "'Trebuchet MS', sans-serif", letterSpacing: 0.5 }}>
                  Dashboard Kinerja Karyawan
                </div>
                <div style={{ fontSize: 12.5, opacity: 0.85 }}>Onty Cake &amp; Bakery — Periode Maret–Juni 2026 · Data ditarik otomatis dari Google Sheets KPI</div>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {["Semua", "Onty 1", "Onty 2"].map(b => (
              <button key={b} onClick={() => setBrandFilter(b)} style={{
                padding: "7px 14px", borderRadius: 999, fontSize: 12.5, fontWeight: 700, cursor: "pointer",
                border: `1.5px solid ${COLORS.gold}`,
                background: brandFilter === b ? COLORS.gold : "transparent",
                color: brandFilter === b ? COLORS.brandDark : "#fff",
              }}>{b}</button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ padding: "22px 28px 0 28px" }}>
        {/* TICKETS ROW */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(190px,1fr))", gap: 14, marginBottom: 26 }}>
          <Ticket label="Rata-rata Skor · Juni" value={juneAvg} sub={`dari skala 1–5 · n=${d.monthly_overall[3].n} penilaian`} accent={COLORS.brandDark} trendVal={overallTrend} />
          <Ticket label="Tren 4 Bulan" value={`${marchAvg} → ${juneAvg}`} sub="Maret menuju Juni — turun konsisten" accent={COLORS.danger} />
          <Ticket label="Divisi Perlu Perhatian" value={filteredDivisionJuni[0]?.divisi.split(" (")[0] || "-"} sub={`skor ${filteredDivisionJuni[0]?.rata2 ?? "-"} — terendah Juni`} accent={COLORS.warn} />
          <Ticket label="Divisi Terbaik" value={filteredDivisionJuni[filteredDivisionJuni.length-1]?.divisi.split(" (")[0] || "-"} sub={`skor ${filteredDivisionJuni[filteredDivisionJuni.length-1]?.rata2 ?? "-"} — Juni`} accent={COLORS.good} />
          <Ticket label="Komponen Terlemah" value={weakestComp ? compLabel[weakestComp[0]] : "-"} sub={weakestComp ? `rata-rata ${weakestComp[1]} — butuh program khusus` : ""} accent={COLORS.inovatif} />
        </div>

        {/* TABS */}
        <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
          {tabBtn("overview", "Ringkasan & Tren")}
          {tabBtn("divisi", "Per Divisi")}
          {tabBtn("individu", "Per Individu")}
          {tabBtn("diagnostik", "Diagnostik Individu")}
          {tabBtn("bahagia", "Nilai BAHAGIA")}
          {tabBtn("aksi", "Rencana Aksi HRD")}
        </div>

        {tab === "overview" && (
          <>
            <Card style={{ marginBottom: 20 }}>
              <SectionTitle eyebrow="Tren Perusahaan" title="Rata-rata Skor Kinerja Keseluruhan" desc="Skor dihitung ulang dengan bobot konsisten (Performance 40%, Disiplin 20%, Teamwork 20%, Inisiatif 10%, Attitude 10%) dari skor mentah 1–5 di setiap sheet, agar dapat dibandingkan antar bulan secara adil." />
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={d.monthly_overall} margin={{ left: -10, right: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e8dcc8" />
                  <XAxis dataKey="bulan" stroke={COLORS.brandDark} />
                  <YAxis domain={[2.5, 5]} stroke={COLORS.brandDark} />
                  <Tooltip contentStyle={{ borderRadius: 10, border: `1px solid ${COLORS.brandLight}` }} />
                  <Line type="monotone" dataKey="rata2" name="Rata-rata Skor" stroke={COLORS.brandDark} strokeWidth={3} dot={{ r: 5, fill: COLORS.gold }} />
                </LineChart>
              </ResponsiveContainer>
              <div style={{ fontSize: 12.5, background: `${COLORS.danger}12`, border: `1px solid ${COLORS.danger}44`, borderRadius: 8, padding: "8px 12px", marginTop: 6, color: COLORS.danger, fontWeight: 600 }}>
                ⚠ Skor turun setiap bulan berturut-turut tanpa kecuali (n meningkat karena lebih banyak karyawan dinilai tiap bulan). Pola ini merata di hampir semua divisi & individu — indikasi kuat ada faktor sistemik (kalibrasi penilai, beban kerja, atau musiman pasca Lebaran), bukan cuma soal performa personal.
              </div>
            </Card>

            <Card style={{ marginBottom: 20 }}>
              <SectionTitle eyebrow="Breakdown Kompetensi" title="Tren per Komponen KPI" desc="Semua 5 komponen kompak menurun — Inisiatif & Attitude turun paling dalam." />
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={d.monthly_component} margin={{ left: -10, right: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e8dcc8" />
                  <XAxis dataKey="bulan" stroke={COLORS.brandDark} />
                  <YAxis domain={[3, 5]} stroke={COLORS.brandDark} />
                  <Tooltip contentStyle={{ borderRadius: 10, border: `1px solid ${COLORS.brandLight}` }} />
                  <Legend />
                  <Line type="monotone" dataKey="performance" name="Performance" stroke={COLORS.gemilang} strokeWidth={2} />
                  <Line type="monotone" dataKey="disiplin" name="Disiplin" stroke={COLORS.amanah} strokeWidth={2} />
                  <Line type="monotone" dataKey="teamwork" name="Teamwork" stroke={COLORS.harmonis} strokeWidth={2} />
                  <Line type="monotone" dataKey="inisiatif" name="Inisiatif" stroke={COLORS.inovatif} strokeWidth={2} />
                  <Line type="monotone" dataKey="attitude" name="Attitude" stroke={COLORS.bersyukur} strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </Card>

            <Card>
              <SectionTitle eyebrow="Sebaran Nilai" title="Distribusi Kategori Kinerja — Juni" desc="Berdasarkan skala Keterangan yang ada di sheet asal (1=Sangat Kurang ... 5=Sangat Baik)." />
              <ResponsiveContainer width="100%" height={260}>
                <PieChart>
                  <Pie data={d.distribution_juni} dataKey="jumlah" nameKey="kategori" cx="50%" cy="50%" outerRadius={95} label={(e) => `${e.kategori}: ${e.jumlah}`}>
                    {d.distribution_juni.map((entry, i) => (
                      <Cell key={i} fill={CAT_COLOR[entry.kategori] || COLORS.brandMid} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </>
        )}

        {tab === "divisi" && (
          <>
            <Card style={{ marginBottom: 20 }}>
              <SectionTitle eyebrow="Perbandingan Divisi" title="Rata-rata Skor per Divisi per Bulan" />
              <ResponsiveContainer width="100%" height={320}>
                <LineChart margin={{ left: -10, right: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e8dcc8" />
                  <XAxis dataKey="bulan" type="category" allowDuplicatedCategory={false} stroke={COLORS.brandDark} />
                  <YAxis domain={[2.5, 5]} stroke={COLORS.brandDark} />
                  <Tooltip contentStyle={{ borderRadius: 10, border: `1px solid ${COLORS.brandLight}` }} />
                  <Legend />
                  {filteredDivisionMonthly.map((row, i) => {
                    const dataPts = ["Maret","April","Mei","Juni"].map(m => ({ bulan: m, val: row[m] }));
                    return (
                      <Line key={row.divisi} data={dataPts} dataKey="val" name={row.divisi} stroke={VALUE_COLORS[i % VALUE_COLORS.length]} strokeWidth={2.5} connectNulls dot={{ r: 4 }} />
                    );
                  })}
                </LineChart>
              </ResponsiveContainer>
            </Card>

            <Card style={{ marginBottom: 20 }}>
              <SectionTitle eyebrow="Ranking Juni" title="Divisi dari Terendah ke Tertinggi" desc="Urutan prioritas intervensi HRD bulan depan." />
              <ResponsiveContainer width="100%" height={Math.max(220, filteredDivisionJuni.length * 46)}>
                <BarChart data={filteredDivisionJuni} layout="vertical" margin={{ left: 40 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e8dcc8" />
                  <XAxis type="number" domain={[0, 5]} stroke={COLORS.brandDark} />
                  <YAxis type="category" dataKey="divisi" width={190} stroke={COLORS.brandDark} tick={{ fontSize: 12 }} />
                  <Tooltip contentStyle={{ borderRadius: 10, border: `1px solid ${COLORS.brandLight}` }} />
                  <Bar dataKey="rata2" name="Rata-rata Juni" radius={[0, 8, 8, 0]}>
                    {filteredDivisionJuni.map((entry, i) => (
                      <Cell key={i} fill={entry.rata2 < 3.5 ? COLORS.danger : entry.rata2 < 4 ? COLORS.warn : COLORS.good} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </Card>

            <Card>
              <SectionTitle eyebrow="Kekuatan & Kelemahan" title="Radar 5 Komponen KPI per Divisi (Juni)" />
              <ResponsiveContainer width="100%" height={380}>
                <RadarChart data={radarData} outerRadius={130}>
                  <PolarGrid stroke="#e8dcc8" />
                  <PolarAngleAxis dataKey="komponen" tick={{ fontSize: 12, fill: COLORS.ink }} />
                  <PolarRadiusAxis domain={[0, 5]} tick={{ fontSize: 10 }} />
                  {filteredDivisionJuni.map((dj, i) => (
                    <Radar key={dj.divisi} name={dj.divisi} dataKey={dj.divisi} stroke={VALUE_COLORS[i % VALUE_COLORS.length]} fill={VALUE_COLORS[i % VALUE_COLORS.length]} fillOpacity={0.12} strokeWidth={2} />
                  ))}
                  <Legend />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </Card>
          </>
        )}

        {tab === "individu" && (
          <>
            <Card style={{ marginBottom: 20 }}>
              <SectionTitle eyebrow="Papan Penghargaan" title="10 Karyawan Skor Tertinggi — Juni" desc="Kandidat rekognisi/reward bulan ini, penguat nilai Gemilang & Bersyukur." />
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                  <thead>
                    <tr style={{ textAlign: "left", color: COLORS.brandDark, borderBottom: `2px solid ${COLORS.gold}` }}>
                      <th style={{ padding: "8px 6px" }}>Nama</th><th>Divisi</th><th>Brand</th><th style={{textAlign:"right"}}>Skor</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topEmployees.map((e, i) => (
                      <tr key={i} style={{ borderBottom: "1px solid #f0e6d4" }}>
                        <td style={{ padding: "7px 6px", fontWeight: 600 }}>{e.nama}</td>
                        <td>{e.divisi}</td>
                        <td>{e.brand}</td>
                        <td style={{ textAlign: "right", fontWeight: 700, color: COLORS.good }}>{e.skor}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>

            <Card style={{ marginBottom: 20 }}>
              <SectionTitle eyebrow="Perlu Pendampingan" title="10 Karyawan Skor Terendah — Juni" desc="Prioritas coaching 1-on-1 bulan depan." />
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                  <thead>
                    <tr style={{ textAlign: "left", color: COLORS.brandDark, borderBottom: `2px solid ${COLORS.gold}` }}>
                      <th style={{ padding: "8px 6px" }}>Nama</th><th>Divisi</th><th>Brand</th>
                      <th style={{textAlign:"right"}}>P</th><th style={{textAlign:"right"}}>D</th><th style={{textAlign:"right"}}>T</th><th style={{textAlign:"right"}}>I</th><th style={{textAlign:"right"}}>A</th>
                      <th style={{textAlign:"right"}}>Skor</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bottomEmployees.map((e, i) => (
                      <tr key={i} style={{ borderBottom: "1px solid #f0e6d4" }}>
                        <td style={{ padding: "7px 6px", fontWeight: 600 }}>{e.nama}</td>
                        <td>{e.divisi}</td>
                        <td>{e.brand}</td>
                        <td style={{textAlign:"right"}}>{e.performance}</td>
                        <td style={{textAlign:"right"}}>{e.disiplin}</td>
                        <td style={{textAlign:"right"}}>{e.teamwork}</td>
                        <td style={{textAlign:"right"}}>{e.inisiatif}</td>
                        <td style={{textAlign:"right"}}>{e.attitude}</td>
                        <td style={{ textAlign: "right", fontWeight: 700, color: COLORS.danger }}>{e.skor}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div style={{fontSize:11.5, color: COLORS.ink, opacity:0.6, marginTop:8}}>P=Performance, D=Disiplin, T=Teamwork, I=Inisiatif, A=Attitude (skala 1–5)</div>
            </Card>

            <Card>
              <SectionTitle eyebrow="Early Warning" title="Karyawan dengan Penurunan Skor Terbesar" desc="Turun ≥1.0 poin sejak penilaian pertama mereka — layak ditelusuri penyebabnya sebelum jadi masalah lebih besar." />
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                  <thead>
                    <tr style={{ textAlign: "left", color: COLORS.brandDark, borderBottom: `2px solid ${COLORS.gold}` }}>
                      <th style={{ padding: "8px 6px" }}>Nama</th><th>Divisi</th><th>Brand</th><th>Riwayat Skor</th><th style={{textAlign:"right"}}>Penurunan</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredDecliners.map((e, i) => (
                      <tr key={i} style={{ borderBottom: "1px solid #f0e6d4" }}>
                        <td style={{ padding: "7px 6px", fontWeight: 600 }}>{e.nama}</td>
                        <td>{e.divisi}</td>
                        <td>{e.brand}</td>
                        <td style={{fontSize:12, opacity:0.8}}>{e.bulan_tersedia.map(m => `${m}:${e.skor_per_bulan[m]}`).join(" → ")}</td>
                        <td style={{ textAlign: "right", fontWeight: 700, color: COLORS.danger }}>{e.trend}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </>
        )}

        {tab === "diagnostik" && (
          <>
            <Card style={{ marginBottom: 20 }}>
              <SectionTitle eyebrow="Diagnostik per Orang" title="KPI Terlemah, Terbaik & Program per Individu" desc="Setiap karyawan dianalisis: komponen KPI paling lemah & paling kuat (bulan terakhir dinilai), status tren (Menurun/Stagnan/Meningkat/Data Baru), dan rekomendasi program yang menyeimbangkan peningkatan kualitas kerja dengan kenyamanan — bukan sekadar 'kejar target'." />
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px,1fr))", gap: 10, marginBottom: 16 }}>
                {Object.entries(kategoriCounts).map(([k, v]) => (
                  <div key={k} onClick={() => setKategoriFilter(kategoriFilter === k ? "Semua" : k)} style={{
                    cursor: "pointer", borderRadius: 10, padding: "10px 12px",
                    border: `1.5px solid ${KATEGORI_COLOR[k] || COLORS.brandMid}`,
                    background: kategoriFilter === k ? `${KATEGORI_COLOR[k]}22` : "#fff",
                  }}>
                    <div style={{ fontSize: 20, fontWeight: 800, color: KATEGORI_COLOR[k] || COLORS.brandMid }}>{v}</div>
                    <div style={{ fontSize: 11.5, fontWeight: 700, color: COLORS.ink }}>{k}</div>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 14 }}>
                <input
                  placeholder="Cari nama atau divisi..."
                  value={searchNama}
                  onChange={e => setSearchNama(e.target.value)}
                  style={{
                    flex: "1 1 220px", padding: "9px 14px", borderRadius: 999,
                    border: `1.5px solid ${COLORS.brandLight}`, fontSize: 13, outline: "none",
                  }}
                />
                {kategoriFilter !== "Semua" && (
                  <button onClick={() => setKategoriFilter("Semua")} style={{
                    padding: "8px 14px", borderRadius: 999, border: `1.5px solid ${COLORS.brandDark}`,
                    background: "transparent", color: COLORS.brandDark, fontSize: 12.5, fontWeight: 700, cursor: "pointer"
                  }}>✕ Filter: {kategoriFilter}</button>
                )}
                <div style={{ fontSize: 12.5, color: COLORS.ink, opacity: 0.65, alignSelf: "center" }}>{filteredDiagnostic.length} karyawan</div>
              </div>

              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12.8 }}>
                  <thead>
                    <tr style={{ textAlign: "left", color: COLORS.brandDark, borderBottom: `2px solid ${COLORS.gold}` }}>
                      <th style={{ padding: "8px 6px" }}>Nama</th>
                      <th>Divisi</th>
                      <th style={{textAlign:"right"}}>Skor Terakhir</th>
                      <th>Status</th>
                      <th>KPI Terlemah</th>
                      <th>KPI Terbaik</th>
                      <th>Kategori Aksi</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredDiagnostic.slice(0, 60).map((e, i) => {
                      const rowId = `${e.brand}-${e.divisi}-${e.nama}`;
                      const isOpen = expandedRow === rowId;
                      return (
                        <React.Fragment key={rowId}>
                          <tr
                            onClick={() => setExpandedRow(isOpen ? null : rowId)}
                            style={{ borderBottom: "1px solid #f0e6d4", cursor: "pointer", background: isOpen ? `${COLORS.gold}12` : "transparent" }}
                          >
                            <td style={{ padding: "7px 6px", fontWeight: 700 }}>{e.nama}</td>
                            <td>{e.divisi} <span style={{opacity:0.5, fontSize:11}}>({e.brand})</span></td>
                            <td style={{ textAlign: "right", fontWeight: 700 }}>{e.skor_terakhir}</td>
                            <td>
                              <span style={{
                                fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 999,
                                color: "#fff",
                                background: e.status === "Menurun" ? COLORS.danger : e.status === "Meningkat" ? COLORS.good : e.status === "Stagnan" ? COLORS.warn : COLORS.brandMid
                              }}>{e.status}{e.perubahan !== null ? ` (${e.perubahan > 0 ? "+" : ""}${e.perubahan})` : ""}</span>
                            </td>
                            <td style={{ color: COLORS.danger, fontWeight: 600 }}>{e.kpi_terlemah} ({e.nilai_terlemah})</td>
                            <td style={{ color: COLORS.good, fontWeight: 600 }}>{e.kpi_terbaik} ({e.nilai_terbaik})</td>
                            <td>
                              <span style={{ fontSize: 11, fontWeight: 700, color: KATEGORI_COLOR[e.kategori_aksi] || COLORS.brandMid }}>{e.kategori_aksi}</span>
                            </td>
                            <td style={{ color: COLORS.brandMid, fontWeight: 700 }}>{isOpen ? "▲" : "▼"}</td>
                          </tr>
                          {isOpen && (
                            <tr>
                              <td colSpan={8} style={{ background: `${COLORS.cream}66`, padding: "10px 16px", fontSize: 13, borderBottom: "1px solid #f0e6d4" }}>
                                <b>Rekomendasi:</b> {e.rekomendasi}
                              </td>
                            </tr>
                          )}
                        </React.Fragment>
                      );
                    })}
                  </tbody>
                </table>
                {filteredDiagnostic.length > 60 && (
                  <div style={{ textAlign: "center", fontSize: 12.5, color: COLORS.ink, opacity: 0.6, padding: "10px 0" }}>
                    Menampilkan 60 dari {filteredDiagnostic.length} — gunakan pencarian untuk mempersempit.
                  </div>
                )}
              </div>
              <div style={{fontSize:11.5, color: COLORS.ink, opacity:0.55, marginTop:10}}>Klik baris untuk melihat rekomendasi program lengkap. Diurutkan dari skor terendah.</div>
            </Card>
          </>
        )}

        {tab === "bahagia" && (
          <Card>
            <SectionTitle eyebrow="Nilai Perusahaan" title="Pemetaan Data ke Nilai BAHAGIA" desc="Setiap huruf BAHAGIA dikaitkan ke komponen KPI yang paling relevan, plus insight dari data 4 bulan terakhir." />
            <div style={{ display: "grid", gap: 12 }}>
              {BAHAGIA_MAP.map((v, i) => (
                <div key={i} style={{
                  display: "flex", gap: 14, alignItems: "flex-start",
                  border: `1px solid ${v.warna}33`, borderLeft: `5px solid ${v.warna}`,
                  borderRadius: 10, padding: "12px 16px", background: `${v.warna}08`
                }}>
                  <div style={{
                    width: 34, height: 34, borderRadius: 8, background: v.warna, color: "#fff",
                    display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, flexShrink: 0
                  }}>{v.huruf}</div>
                  <div>
                    <div style={{ fontWeight: 800, color: v.warna, fontSize: 14.5 }}>{v.nilai} <span style={{fontWeight:500, color: COLORS.ink, opacity:0.6, fontSize:12}}>· terkait komponen {v.komponen}</span></div>
                    <div style={{ fontSize: 13, marginTop: 3, color: COLORS.ink }}>{v.insight}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {tab === "aksi" && (
          <div style={{ display: "grid", gap: 16 }}>
            {MONTH_PROGRAMS.map((prog, i) => (
              <Card key={i}>
                <div style={{ display: "flex", gap: 12, alignItems: "baseline", marginBottom: 8 }}>
                  <div style={{
                    fontSize: 12, fontWeight: 800, color: "#fff", background: COLORS.brandDark,
                    padding: "3px 10px", borderRadius: 999
                  }}>{prog.bulan}</div>
                  <div style={{ fontWeight: 800, color: COLORS.brandDark, fontSize: 15 }}>{prog.fokus}</div>
                </div>
                <ul style={{ margin: 0, paddingLeft: 20 }}>
                  {prog.aksi.map((a, j) => (
                    <li key={j} style={{ fontSize: 13.5, marginBottom: 6, color: COLORS.ink }}>{a}</li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
