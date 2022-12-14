import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from './Button';

const CuatrocientosCuatro = () => {
  return (
    <StyledCuatrocientosCuatro className='cuatrocientosCuatroClass'>
      <h2>404 - PAGE NOT FOUND</h2>
      <p>You are searching for a page that doesn't exist</p>
      <p>Please be sure you are indicating the url propertly</p>
      <p></p>
      <Button
        as={Link}
        to='/adverts'
        variant='primary'
      >
        Return to advertisements
      </Button>
    </StyledCuatrocientosCuatro>
  );
};

const StyledCuatrocientosCuatro = styled.section`
  color: red;
  background-color: black;
  margin: 10px;
  padding: 10px;
`;

export default CuatrocientosCuatro;
