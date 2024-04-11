import styled from 'styled-components';
import Link from 'next/link';

export const SSidebar = styled.div`
  background: dodgerblue;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 24px;
  margin: 16px;
  border-radius: 8px;
  height: calc(100vh - 32px);
`;

export const SLinksList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const SLink = styled(Link)`
  color: white;
  font-weight: 600;
`;
