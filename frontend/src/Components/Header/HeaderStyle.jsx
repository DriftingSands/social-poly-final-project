import styled from "styled-components";

export const HeaderMain = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100vw;
  max-width: 100vw;
  height: 60px;
  padding: 5px;
  .TopLeft {
    display: flex;
  }
  img {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    height: 55px;
    cursor: pointer;
  }
  h1 {
    display: inline-flex;
    align-items: center;
    cursor: pointer;
  }
`;

export const MobileHeaderMain = styled.div`
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  align-items: center;
  width: 100vw;
  max-width: 100vw;
  height: 60px;
  padding: 5px;
  .TopLeft {
    display: flex;
  }
  img {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    height: 55px;
    cursor: pointer;
  }
`;
