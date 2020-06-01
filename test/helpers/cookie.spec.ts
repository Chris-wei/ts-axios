import cookie from '../../src/helpers/cookie'

describe('helpers:cookie', () => {
    test('should read cookies', () => {
        document.cookie = 'foo=bar'
        expect(cookie.read('foo')).toBe('bar')
    })

    test('should return null if cookie name is not exist', () => {
        document.cookie = 'foo=bar'
        expect(cookie.read('bar')).toBeNull()
    })
})
