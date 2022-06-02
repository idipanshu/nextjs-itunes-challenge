/**
 *
 * Header
 *
 */

import React from 'react';
import { Layout } from 'antd';
import styled from 'styled-components';
import { injectIntl } from 'react-intl';
import { fonts, colors } from '@themes';
import Text from '@components/Text';

const StyledHeader = styled(Layout.Header)`
  && {
    &.ant-layout-header {
      padding: 0 1rem;
      height: 7rem;
    }
    display: flex;
    justify-content: center;
    background-color: ${colors.primary};
  }
`;
const Title = styled(Text)`
  && {
    margin-bottom: 0;
    ${fonts.style.heading};
    display: flex;
    align-self: center;
    color: ${colors.text};
  }
`;
function Header(props) {
  return (
    <StyledHeader {...props} data-testid="header">
      <Title type="heading" id="heading_text" data-testid="header-title" />
    </StyledHeader>
  );
}

export default injectIntl(Header);
