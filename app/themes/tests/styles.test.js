import styles from '../styles';

describe('styles', () => {
  it('should have the correct linear-gradient string', () => {
    expect(styles.defaultLinearGradient('red', 'orange')).toEqual('linear-gradient(red, orange)');
  });
});
