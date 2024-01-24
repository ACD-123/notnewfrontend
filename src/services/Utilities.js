/* eslint-disable valid-typeof */
export function isEmpty(obj) {
  if (typeof obj === undefined || obj == null || obj === false || obj === 'NaN')
    return true

  if (obj.length > 0) return false
  if (obj.length === 0) return true

  if (typeof obj !== 'object') return true

  return Object.keys(obj).length === 0
}

export function notification(message) {
  return this.$notification.open({ message })
}

export function filterOption(input, option) {
  return option.componentOptions.children[0].text
    .toLowerCase()
    .includes(input.toLowerCase())
}
