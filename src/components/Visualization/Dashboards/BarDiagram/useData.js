import React, { useState, useEffect } from 'react';
import { inData }  from './data.js';

const csvUrl =
  'https://gist.githubusercontent.com/curran/0ac4077c7fc6390f5dd33bf5c06cb5ff/raw/605c54080c7a93a417a3cea93fd52e7550e76500/UN_Population_2019.csv';

export const useData = () => {
  //console.log(inData[0])
  let data = []
  inData.forEach((e)=>{
  	data.push({//moment
    	date: e.key.date,
      	//.format('YYYY-MM-DDT00:00:00'),
      doc_count: e.doc_count
    })
  })
  
  return data;
};