// import React from 'react'
import React, { useState } from 'react';
import Header from '../../components/Header/Header'
import styles from './Plot.module.css'
import { useNavigate } from 'react-router-dom';


const Plot = () => {
  <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
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
    navigate('/home', {state: {formData}});
  };

  return (
    <div className={styles.container}>
      <Header title={"Your Plot"}  />
      <form class={styles.form_container} onSubmit={handleSubmit}>
        <label class={styles.title} htmlFor="title">Name</label>
        <label class={styles.describe}>ชื่อที่เข้าใจง่าย หรือสื่อถึงเนื้อหาของพล็อต</label>
        <textarea
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          rows={8}
          maxlength="200"
        />
        <br />
        <label class={styles.title} htmlFor="plot">The Plot</label>
        <label class={styles.describe}>จุดเริ่มต้น หรือปมต่างๆของเรื่อง เกิดอะไรขึ้น ที่ไหน อะไร อย่างไร</label>
        <textarea
          id="plot"
          name="plot"
          value={formData.plot}
          onChange={handleChange}
          rows={13}
          maxlength="1820"
        />
        <br />
        <label class={styles.title} htmlFor="characters">Character</label>
        <label class={styles.describe}>ชื่อ อายุ ลักษณะนิสัยของตัวละคร</label>
        <textarea
          id="characters"
          name="characters"
          value={formData.characters}
          onChange={handleChange}
          rows={13}
          maxlength="1820"
        />
        <br />
        <label class={styles.title} htmlFor="timeframe">Timeline</label>
        <label class={styles.describe}>ช่วงเวลาที่เกิดเหตุการณ์แต่ละเหตุการณ์ หรือปีที่เกิดเหตุการณ์ต่างๆ</label>
        <textarea
          id="timeframe"
          name="timeframe"
          value={formData.timeframe}
          onChange={handleChange}
          rows={13}
          maxlength="1820"
        />
        <br />
        <div className={styles.buttonContainer}><button type="submit">Post</button></div>
      </form>
    </div>
  );
};

export default Plot;