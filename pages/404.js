import React from 'react';
import Image from 'next/image';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { injectIntl } from 'react-intl';
import { Card } from 'antd';

import { styles, buttons } from '@themes';
import icon from '@images/404.png';
import Text from '@components/Text';

const CustomCard = styled(Card)`
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  ${styles.boxShadow('0', '0', '3px')}
  ${styles.margin.applyMargin('1rem', '', '1rem', '')}
`;
const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
const Button = styled.button`
  ${buttons.primary()}
`;

const NotFound = ({ intl }) => {
  const router = useRouter();

  return (
    <CustomCard>
      <ImageWrapper>
        <Image src={icon} height={100} width={100} alt="404 Not Found" />
      </ImageWrapper>

      <Text color="red" fontsize="font-size: 1.5rem">
        {intl.formatMessage({ id: '404_error_message' })}
      </Text>

      <Button block type="primary" onClick={() => router.push('/')}>
        {intl.formatMessage({ id: 'go_home_button_text' })}
      </Button>
    </CustomCard>
  );
};

NotFound.propTypes = {
  intl: PropTypes.object
};

export default compose(injectIntl)(NotFound);
