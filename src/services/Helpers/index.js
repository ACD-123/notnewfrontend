export const isEmpty = (value, depth = 1, level = 0) => {
  if (level === depth) {
    return false
  }
  return (
    value === undefined ||
    value === null ||
    (typeof value === 'object' &&
      (Object.keys(value).length === 0 ||
        Object.keys(value).every((key) =>
          isEmpty(value[key], depth, level + 1)
        ))) ||
    (typeof value === 'string' && value.trim().length === 0)
  )
}

export function success($this, props) {
  return $this.$notification.open({ ...props, class: 'success-notification' })
}
