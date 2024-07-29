export function success($this, props) {
  return $this.$notification.open({ ...props, className: 'success-notification' })
}

export function error($this, props) {
  return $this.$notification.open({ ...props, className: 'error-notification' })
}
