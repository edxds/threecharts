import styled from 'styled-components/macro';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;

  min-height: 100%;
  padding: 16px;
`;

const ProfilePicture = styled.img`
  width: 72px;
  height: 72px;
  border-radius: 72px;
`;

const UserName = styled.span`
  font-size: 1.5rem;
  font-weight: 700;
`;

const UserDisplayName = styled.span`
  font-size: 1rem;
  font-weight: 400;
  opacity: 0.6;
`;

export const Styled = {
  Container,
  ProfilePicture,
  UserName,
  UserDisplayName,
};
