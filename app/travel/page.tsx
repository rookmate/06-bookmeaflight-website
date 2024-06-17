"use client";

import React from 'react';
import ReusableMasonry from '../components/ReusableMasonry.tsx'; 

const images = [
  'v1718303777/IMG_0490_o4uuy3.jpg',
  'v1718303775/IMG_0489_m3yqmw.jpg',
  'v1718303774/IMG_1559_t732d6.jpg',
  'v1718303774/IMG_0657_din50q.jpg',
  'v1718303773/IMG_1542_lts6bd.jpg',
  'v1718303773/IMG_0670_cauf0n.jpg',
  'v1718303772/IMG_1399_cycgif.jpg',
  'v1718303772/IMG_1405_d12d7x.jpg',
  'v1718303771/IMG_3937_ou8o4h.jpg',
  'v1718303769/IMG_1657_wszawb.jpg',
  'v1718303769/IMG_0066_yoh5qy.jpg',
  'v1718303768/IMG_0125_wyrmzq.jpg',
  'v1718303767/IMG_0118_lo9nzr.jpg',
  'v1718303766/IMG_3940_jpg_krtt4c.jpg',
  'v1718303766/IMG_6419_rhqayd.jpg',
  'v1718303766/IMG_0114_jurnak.jpg',
  'v1718303766/IMG_5644_jpg_bdykva.jpg',
  'v1718303765/IMG_6499_v0fckk.jpg',
  'v1718303763/IMG_6420_btwjxv.jpg',
  'v1718303763/New_Project_2021-05-12_20_23_36_grzcve.jpg',
  'v1718303761/IMG_5567_jpg_japf9f.jpg',
  'v1718303762/IMG_6443_jpg_szzqoi.jpg',
  'v1718303759/IMG_6778_vky9ng.jpg',
  'v1718303758/IMG_6414_ujilch.jpg',
  'v1718303757/IMG_6612_jpg_zau4lp.jpg',
  'v1718303756/IMG_6502_wntsxt.jpg',
  'v1718303756/IMG_6692_jpg_voagsk.jpg',
  'v1718303755/IMG_6840_ejni7n.jpg',
  'v1718303752/IMG_6836_l6nhmy.jpg',
  'v1718303751/IMG_0246_jpg_mki3ge.jpg',
  'v1718303750/8A1BF34A-C4B1-4423-8769-509692D2F426_c3mivr.jpg',
  'v1718303748/IMG_6842_sw09q1.jpg',
  'v1718303743/IMG_0892_jpg_yu4yp5.jpg',
  'v1718303747/IMG_6852_ckqezu.jpg',
  'v1718303745/IMG_2905_jpg_hpdpme.jpg',
  'v1718303742/IMG_2643_jpg_mhdgjx.jpg',
];

export default function Travel() {
  return (
    <div>
      <ReusableMasonry images={images} />
    </div>
  );
}