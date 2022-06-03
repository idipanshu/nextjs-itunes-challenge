import React from 'react';
import Image from 'next/image';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { injectIntl } from 'react-intl';
import { Card, Typography, Button } from 'antd';

import { styles } from '@themes';
import icon from '@images/404.png';

const { Title } = Typography;

const CustomCard = styled(Card)`
  border-radius: 10px;
  display: flex;
  justify-content: center;
  ${styles.boxShadow('0', '0', '3px')}
  ${styles.margin.applyMargin('1rem', '', '1rem', '')}
`;
const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const NotFound = ({ intl }) => {
  const router = useRouter();

  return (
    <CustomCard>
      <ImageWrapper>
        <Image src={icon} height={100} width={100} alt="404 Not Found" />
      </ImageWrapper>

      <Title level={2} type="danger">
        {intl.formatMessage({ id: '404_error_message' })}
      </Title>

      <Button type="primary" shape="round" onClick={() => router.push('/')}>
        {intl.formatMessage({ id: 'go_home_button_text' })}
      </Button>
    </CustomCard>
  );
};

NotFound.propTypes = {
  intl: PropTypes.object
};

export default compose(injectIntl)(NotFound);
