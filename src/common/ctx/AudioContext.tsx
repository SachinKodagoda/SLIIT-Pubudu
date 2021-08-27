import { create, SpeechCommandRecognizer } from '@tensorflow-models/speech-commands';
import React, { useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

type TProps = {
  children: JSX.Element;
};

interface IContext {
  model: SpeechCommandRecognizer | null;
  action: string | null;
  labels: string[];
  microphoneOn: boolean;
  isMicDisabled: boolean;
  setMicrophoneOn: React.Dispatch<React.SetStateAction<boolean>>;
  setModel: React.Dispatch<React.SetStateAction<SpeechCommandRecognizer | null>>;
  setAction: React.Dispatch<React.SetStateAction<string | null>>;
  setLabels: React.Dispatch<React.SetStateAction<string[]>>;
  recognizeCommands: () => Promise<void | null>;
  messageArray: { message: string; type: string }[];
}

const initContext: IContext = {
  model: null,
  action: null,
  labels: [],
  microphoneOn: false,
  isMicDisabled: false,
  setMicrophoneOn: () => null,
  setModel: () => null,
  setAction: () => null,
  setLabels: () => null,
  recognizeCommands: async () => null,
  messageArray: [],
};

export const AudioContext = React.createContext<IContext>(initContext);

export const AudioContextProvider = ({ children }: TProps): React.ReactElement => {
  const [model, setModel] = useState(initContext.model);
  const [action, setAction] = useState(initContext.action); // detected keyword
  const [labels, setLabels] = useState(initContext.labels); // list of keywords
  const [microphoneOn, setMicrophoneOn] = useState(initContext.microphoneOn);
  const [messageArray, setMessageArray] = useState(initContext.messageArray);
  const [isMicDisabled, setIsMicDisabled] = useState(initContext.isMicDisabled);
  const { resetTranscript, transcript } = useSpeechRecognition();

  const loadModel = async () => {
    const recognizer = await create('BROWSER_FFT');
    await recognizer.ensureModelLoaded();
    setModel(recognizer);
    setLabels(recognizer.wordLabels());
  };

  const stopListening = async () => {
    if (model) {
      setMicrophoneOn(false);
      model.stopListening();
    }
    // resetTranscript();
    SpeechRecognition.stopListening();
  };

  const argMax = (arr: string[]) => {
    return arr.map((x, i) => [x, i]).reduce((r, a) => (a[0] > r[0] ? a : r))[1];
  };
  const setTheAction = async (val: string | null) => {
    setAction(val);
    setMessageArray(msgArr => {
      const temp = [...msgArr];
      if (val) {
        const isAvailable = labels.includes(val);
        if (isAvailable) {
          temp.push({ message: val, type: 'key' });
        }
      }
      return temp;
    });

    if (model && val === 'stop') {
      await stopListening();
    }
  };

  const recognizeCommands = async () => {
    if (model) {
      model.listen(
        result => {
          return setTheAction(labels[argMax(Object.values(result.scores))]);
        },
        { includeSpectrogram: true, probabilityThreshold: 0.7 }
      );
      // setTimeout(() => {
      //   setMicrophoneOn(false);
      //   model.stopListening();
      // }, 10e3);
    }
  };
  useEffect(() => {
    if (microphoneOn && !!model) {
      recognizeCommands();
    }
    if (microphoneOn) {
      resetTranscript();
      setIsMicDisabled(true);
      SpeechRecognition.startListening({ continuous: true });
    } else {
      setIsMicDisabled(false);
      const msg = transcript;
      const tempMsg = msg.replace('stop', '');
      if (tempMsg) {
        setMessageArray(msgArr => {
          const temp = [...msgArr];
          temp.push({ message: tempMsg, type: 'other' });
          return temp;
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [microphoneOn]);

  useEffect(() => {
    loadModel();
  }, []);

  const contextValue = {
    model,
    action,
    labels,
    isMicDisabled,
    microphoneOn,
    messageArray,
    setMicrophoneOn,
    setModel,
    setAction,
    setLabels,
    recognizeCommands,
  };

  return <AudioContext.Provider value={contextValue}>{children}</AudioContext.Provider>;
};
