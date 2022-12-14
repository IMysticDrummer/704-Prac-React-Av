import { createContext, useContext, useEffect, useState } from 'react';
import { getTags } from './service';

const OptionsContext = createContext();

OptionsContext.displayName = 'TagOptions';

/**
 * Context Provider for TagOptions
 * @param {React.Component || html} param0
 * @returns {Context.Provider}
 */
export const OptionsContexProvider = ({ children }) => {
  const [tagOptions, setTagOptions] = useState([]);

  useEffect(() => {
    const tagsSelection = async () => {
      try {
        const tags = await getTags();
        setTagOptions(tags);
      } catch (error) {
        setTagOptions(['error, no tags getted']);
      }
    };
    tagsSelection();
  }, []);

  return (
    <OptionsContext.Provider value={{ tagOptions }}>
      {children}
    </OptionsContext.Provider>
  );
};

export const OptionsContextConsumer = OptionsContext.Consumer;

/**
 * You can get the tagsOptions array to use in your application
 * @returns {React.Context}
 */
export const useOptions = () => {
  const value = useContext(OptionsContext);
  //console.log(value);
  return value;
};

export default OptionsContext;
