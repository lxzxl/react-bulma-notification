import Notification from '../index';

describe('react-bulma-notification', () => {
  it('basic api works', () => {
    Notification.notice('test notice', { duration: 0 });
    expect(document.querySelectorAll('.bulma-notification-notice').length).toBe(
      1
    );
    Notification.remove();
    expect(document.querySelectorAll('.bulma-notification-notice').length).toBe(
      0
    );
  });

  it('colors work', () => {
    Notification.info('test info');
    Notification.success('test success');
    Notification.warn('test warning');
    Notification.error('test error');
    expect(document.querySelectorAll('.bulma-notification-notice').length).toBe(
      4
    );
    Notification.remove();
  });

  it('placements work', () => {
    Notification.info('test top right', { placement: 'topRight', duration: 0 });
    Notification.info('test success', { placement: 'topLeft', duration: 0 });
    Notification.info('test warning', { placement: 'bottomLeft', duration: 0 });
    Notification.info('test error', { placement: 'bottomRight', duration: 0 });
    expect(document.querySelectorAll('.bulma-notification').length).toBe(4);
    Notification.remove(undefined, 'bottomRight');
    expect(document.querySelectorAll('.bulma-notification.bottomRight').length).toBe(0);
  });
});
