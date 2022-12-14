import styled from 'styled-components';

export const Button = styled.button`
  background: ${(props) =>
    props.variant === 'primary'
      ? 'var(--main-color)' || 'white'
      : 'var(--main-bg-color)' || 'darkblue'};
  color: ${(props) =>
    props.variant === 'primary'
      ? 'var(--main-bg-color)' || 'darkblue'
      : 'var(--main-color)' || 'white'};
  border: 2px solid
    ${(props) =>
      props.variant === 'primary'
        ? 'var(--main-bg-color)' || 'darkblue'
        : 'var(--main-color)' || 'white'};
  border-radius: 5px;
  padding: 5px;
  font: inherit;
  min-height: 30px;
  min-width: 60px;
  transition: background 0.3s, color 0.3s;
  &:hover {
    background: ${'var(--resalted-bg-color)' || 'lightblue'};
    color: ${'var(--resalted-color)' || 'darkblue'};
    border-color: ${'var(--resalted-bg-color)' || 'lightblue'};
  }
  &:disabled {
    background: grey;
    color: darkgrey;
    border-color: darkgrey;
  }
  text-decoration: none;
`;
