"use client";

import React from 'react';
import ReusableMasonry from '../components/ReusableMasonry.tsx';

const images = [
  'v1718300222/IMG_6863_jpg_s50o9d.jpg',
  'v1718300225/IMG_7028_jpg_lezqhf.jpg',
  'v1718300221/IMG_6789_wjezaz.jpg',
  'v1718300221/IMG_6741_jpg_jg9zzg.jpg',
  'v1718300220/IMG_6742_jpg_asrywl.jpg',
  'v1718300220/IMG_6748_jpg_fxwr2z.jpg',
  'v1718300219/IMG_6740_jpg_pbnfdf.jpg',
  'v1718300216/IMG_6885_jpg_ar2ueg.jpg',
  'v1718300216/IMG_6772_irwp1t.jpg',
  'v1718300216/IMG_6773_hj8xl8.jpg',
  'v1718300214/IMG_7024_jpg_aozrtb.jpg',
  'v1718300213/IMG_6796_jpg_oocpom.jpg',
  'v1718300213/IMG_6777_thaimy.jpg',
  'v1718300211/IMG_6784_wvxz6s.jpg',
  'v1718300210/IMG_6781_aokbbd.jpg',
  'v1718300206/IMG_6800_jpg_aqcgsq.jpg',
  'v1718300206/IMG_7057_jpg_ivzs4t.jpg',
  'v1718300206/IMG_7216_jpg_ex9j1t.jpg',
  'v1718299917/IMG_7085_jpg_b7oope.jpg',
  'v1718299917/IMG_7147_jpg_vzz6aj.jpg',
  'v1718299917/IMG_7060_jpg_ovqysi.jpg',
  'v1718299911/IMG_7225_jpg_rqj5ih.jpg',
  'v1718299909/IMG_7171_jpg_r9zet4.jpg',
  'v1718303596/IMG_6909_vusfdq.jpg',
  'v1718303598/IMG_6666_s3tbuk.jpg',
  'v1718303597/IMG_6525_hwpwot.jpg',
  'v1718303597/IMG_6693_cz4uyw.jpg',
  'v1718303592/9A5F48E9-2F22-4D92-94EC-E3A4C7B81526_ghcryg.jpg',
  'v1718303592/IMG_2587_nj792g.jpg',
  'v1718303590/IMG_6471_vhhvs1.jpg',
  'v1718303589/New_Project_2021-05-14_20_45_19_f8ey0v.jpg',
  'v1718303588/9A900618-914B-4015-9FEE-3349E3003146_lvgyjh.jpg',
];

export default function Restaurants() {
  return (
    <div>
      <ReusableMasonry images={images} />
    </div>
  );
}