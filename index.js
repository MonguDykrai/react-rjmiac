import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import { TimePicker, Button } from 'antd';
import moment from 'moment';
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';

const App = () => {
  const [values, setValues] = useState([]);

  useEffect(() => {
    const id = uuidv4();
    const value = {
      id,
      moments: [moment('0000', 'HHmm'), moment('2359', 'HHmm')],
      disabledTime: function (
        // currentTime
        now,
        type
      ) {
        const { id } = this;
        // console.log({ id });
        // console.log(now, type);
        // console.log(now.format('HHmm'), type);
        console.log({
          id,
          formattedTime: now.format('HHmm'),
          type,
        });
        return {
          disabledHours: () => {
            return [];
          },
          disabledMinutes: (selectedHour) => {
            // console.log(selectedHour);
            return [];
          },
        };
      }.bind({ id }),
    };
    setValues([
      ...values,
      value,
      // {
      //   id: uuidv4(),
      //   moments: [moment('0000', 'HHmm'), moment('2359', 'HHmm')],
      //   // moments: [],
      //   disabledTime: function (
      //     // currentTime
      //     now,
      //     type
      //   ) {
      //     console.log(now, type);
      //     console.log(now.format('HHmm'), type);
      //     return {
      //       disabledHours: () => {
      //         return [];
      //       },
      //       disabledMinutes: (selectedHour) => {
      //         // console.log(selectedHour);
      //         return [];
      //       },
      //     };
      //   },
      // },
    ]);
  }, []);
  return (
    <>
      {values.map((value) => {
        const { id, moments, disabledTime } = value;
        return (
          <div key={id}>
            <TimePicker.RangePicker
              format="HHmm"
              onChange={(changeValue) => {
                const valuesCopy = _.cloneDeep(values);
                changeValue = {
                  ...changeValue,
                  id,
                  moments: changeValue.map((v) => moment(v)),
                };
                const findIndex = valuesCopy.findIndex((vc) => vc.id === id);
                valuesCopy[findIndex] = changeValue;
                setValues(valuesCopy);
              }}
              value={moments}
              disabledTime={disabledTime}
              onOpenChange={(open) => {
                console.log({ open });
              }}
            />
          </div>
        );
      })}
      <Button
        onClick={() => {
          setValues([
            ...values,
            {
              id: uuidv4(),
              value: [],
            },
          ]);
        }}
      >
        新增
      </Button>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('container'));
