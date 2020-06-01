import {transformRequest, transformResponse} from "../../src/helpers/data";

describe('helpers:data', () => {
    describe('transformRequest', () => {
        test('should transform request data to string if data is a PlainObject', () => {
            const a = {foo: 123}
            expect(transformRequest(a)).toBe('{"foo":123}')
        })

        test('should do noting if data is not a PlainObject', () => {
            const a = new URLSearchParams('a=b')
            expect(transformRequest(a)).toBe(a)
        })
    })

    describe('transformResponse', () => {
        test('should transform response data to json if data is a json string', () => {
            const a = '{"foo":123}'
            expect(transformResponse(a)).toEqual({foo: 123})
        })

        test('should do nothing if data is not a json string', () => {
            const a = '{foo:123}'
            expect(transformResponse(a)).toBe('{foo:123}')
        })

        test('should do nothing if data is not a string', () => {
            const a = {foo: 123}
            expect(transformResponse(a)).toBe(a)
        })
    })
})
