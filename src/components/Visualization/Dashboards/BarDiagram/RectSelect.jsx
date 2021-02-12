import React from 'react';
export const RectSelect = ({ 
    firstPointX,
    firstPointY,
    secondPointX,
    secondPointY,
  }) =>{
    let fpX = firstPointX<secondPointX?
        firstPointX:secondPointX,
      fpY = firstPointY<secondPointY?
        firstPointY:secondPointY
    return <rect
            className="rectSelect"
            x={fpX}
            y={fpY}
            width={Math.abs(
                    firstPointX-secondPointX)}
            height={Math.abs(
                    firstPointY-secondPointY)}>
          </rect>
  };