import React, { useState, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import { TimePicker, Button } from 'antd';
import moment from 'moment';
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';

const App = () => {
  const [values, setValues] = useState([]);

  const addValue = useCallback(
    (moments = []) => {
      const id = uuidv4();
      const disabledTime = function (
        // currentTime
        now,
        type
      ) {
        const { id } = this;
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
      }.bind({ id });
      const value = {
        id,
        moments,
        disabledTime,
      };
      setValues([...values, value]);
    },
    [values, setValues, uuidv4, moment]
  );

  useEffect(() => {
    addValue([moment('0000', 'HHmm'), moment('2359', 'HHmm')]);
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
          addValue();
        }}
      >
        新增
      </Button>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('container'));
