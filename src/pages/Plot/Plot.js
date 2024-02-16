import React from 'react'
//import React, { useState } from 'react';
import Header from '../../components/Header/Header'
import styles from './Plot.module.css'


const Plot = () => {
  <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
  const [formData, setFormData] = React.useState({
    title: "",
    plot: "",
    characters: "",
    timeframe: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div>
      <Header title={"Plot"}  />
      <form class={styles.form_container} onSubmit={handleSubmit}>
        <label class={styles.title_1} htmlFor="title">Name</label><br />
        <label class={styles.describe1}>ชื่อที่เข้าใจง่าย หรือสื่อถึงเนื้อหาของพล็อต</label><br />
        <textarea
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          rows={8} 
          cols={200}
          maxlength="200"
        />
        <br />
        <label class={styles.title_2} htmlFor="plot">The Plot</label><br />
        <label class={styles.describe2}>จุดเริ่มต้น หรือปมต่างๆของเรื่อง เกิดอะไรขึ้น ที่ไหน อะไร อย่างไร</label><br />
        <textarea
          id="plot"
          name="plot"
          value={formData.plot}
          onChange={handleChange}
          rows={13} 
          cols={200}
          maxlength="1820"
        />
        <br />
        <label class={styles.title_3} htmlFor="characters">Character</label><br />
        <label class={styles.describe3}>ชื่อ อายุ ลักษณะนิสัยของตัวละคร</label><br />
        <textarea
          id="characters"
          name="characters"
          value={formData.characters}
          onChange={handleChange}
          rows={13} 
          cols={200}
          maxlength="1820"
        />
        <br />
        <label class={styles.title_4} htmlFor="timeframe">Timeline</label><br />
        <label class={styles.describe4}>ช่วงเวลาที่เกิดเหตุการณ์แต่ละเหตุการณ์ หรือปีที่เกิดเหตุการณ์ต่างๆ</label><br />
        <textarea
          id="timeframe"
          name="timeframe"
          value={formData.timeframe}
          onChange={handleChange}
          rows={13} 
          cols={200}
          maxlength="1820"
        />
        <br />
        <button type="submit">Post</button>
      </form>
    </div>
  );
};

export default Plot;