"use client";

import React from 'react';
import ReusableMasonry from '../components/ReusableMasonry.tsx'; 

const images = [
  'v1718299505/ld-export-9dddc056-06132024_jlqaft.jpg',
  'v1718303777/IMG_0490_o4uuy3.jpg',
  'v1718303775/IMG_0489_m3yqmw.jpg',
  'v1718303766/IMG_3940_jpg_krtt4c.jpg',
  'v1718300222/IMG_6863_jpg_s50o9d.jpg',
  'v1718300225/IMG_7028_jpg_lezqhf.jpg',
  'v1718300221/IMG_6741_jpg_jg9zzg.jpg',
  'v1718303763/New_Project_2021-05-12_20_23_36_grzcve.jpg',
  'v1718303765/IMG_6499_v0fckk.jpg',
];

export default function Restaurants() {
  return (
    <div>
      <ReusableMasonry images={images} />
    </div>
  );
}