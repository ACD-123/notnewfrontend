export function success($this, props) {
  return $this.$notification.open({ ...props, class: 'success-notification' })
}

export function error($this, props) {
  return $this.$notification.open({ ...props, class: 'error-notification' })
}
