import Layout from '../../../Layout'
import parsePropName from './parsePropName'

describe('parsePropName', () => {
  describe('given layout with default breakpoints', () => {
    it('parses a prop name without breakpoint or behavior', () => {
      expect(parsePropName('gap')).toEqual({
        originPropName: 'gap',
        purePropName: 'gap',
        behavior: 'up',
        breakpoint: {
          name: 'xs',
          isDefault: true,
        },
      })
    })

    it('parses a prop name with breakpoint without behavior', () => {
      expect(parsePropName('gapMd')).toEqual({
        originPropName: 'gapMd',
        purePropName: 'gap',
        behavior: 'up',
        breakpoint: {
          name: 'md',
          isDefault: false,
        },
      })
    })

    it('parses prop name with behavior and without breakpoint', () => {
      expect(parsePropName('gapDown')).toEqual({
        originPropName: 'gapDown',
        purePropName: 'gap',
        behavior: 'down',
        breakpoint: {
          name: 'xs',
          isDefault: true,
        },
      })
    })

    it('parses a prop name with a breakpoint and behavior', () => {
      expect(parsePropName('gapLgOnly')).toEqual({
        originPropName: 'gapLgOnly',
        purePropName: 'gap',
        behavior: 'only',
        breakpoint: {
          name: 'lg',
          isDefault: false,
        },
      })

      expect(parsePropName('paddingVerticalMdDown')).toEqual({
        originPropName: 'paddingVerticalMdDown',
        purePropName: 'paddingVertical',
        behavior: 'down',
        breakpoint: {
          name: 'md',
          isDefault: false,
        },
      })
    })

    it('ignores matching breakpoint in wrong casing', () => {
      expect(parsePropName('templatelg')).toEqual({
        originPropName: 'templatelg',
        purePropName: 'templatelg',
        behavior: 'up',
        breakpoint: {
          name: 'xs',
          isDefault: true,
        },
      })
    })

    it('ignores matching behavior in wrong casing', () => {
      expect(parsePropName('templateonly')).toEqual({
        originPropName: 'templateonly',
        purePropName: 'templateonly',
        behavior: 'up',
        breakpoint: {
          name: 'xs',
          isDefault: true,
        },
      })
    })

    it('ignores matching breakpoint and behavior in wrong casing', () => {
      expect(parsePropName('templatemdonly')).toEqual({
        originPropName: 'templatemdonly',
        purePropName: 'templatemdonly',
        behavior: 'up',
        breakpoint: {
          name: 'xs',
          isDefault: true,
        },
      })
    })

    it('ignores unknown suffixes', () => {
      expect(parsePropName('gapFoo')).toEqual({
        originPropName: 'gapFoo',
        purePropName: 'gapFoo',
        behavior: 'up',
        breakpoint: {
          name: 'xs',
          isDefault: true,
        },
      })
    })
  })

  describe('given layout with custom breakpoints', () => {
    beforeAll(() => {
      Layout.configure({
        defaultBreakpointName: 'mobile',
        breakpoints: {
          mobile: {},
          tablet: {},
          desktopRetina: {},
        },
      })
    })

    it('parses a prop name without breakpoint or behavior', () => {
      expect(parsePropName('marginLeft')).toEqual({
        originPropName: 'marginLeft',
        purePropName: 'marginLeft',
        behavior: 'up',
        breakpoint: {
          name: 'mobile',
          isDefault: true,
        },
      })
    })

    it('parses a prop name with custom breakpoint and without behavior', () => {
      expect(parsePropName('templateTablet')).toEqual({
        originPropName: 'templateTablet',
        purePropName: 'template',
        behavior: 'up',
        breakpoint: {
          name: 'tablet',
          isDefault: false,
        },
      })

      expect(parsePropName('widthDesktopRetina')).toEqual({
        originPropName: 'widthDesktopRetina',
        purePropName: 'width',
        behavior: 'up',
        breakpoint: {
          name: 'desktopRetina',
          isDefault: false,
        },
      })
    })

    it('parses a prop name with behavior without breakpoint', () => {
      expect(parsePropName('templateOnly')).toEqual({
        originPropName: 'templateOnly',
        purePropName: 'template',
        behavior: 'only',
        breakpoint: {
          name: 'mobile',
          isDefault: true,
        },
      })
    })

    it('parses a prop name with custom breakpoint and behavior', () => {
      expect(parsePropName('paddingHorizontalDesktopRetinaDown')).toEqual({
        originPropName: 'paddingHorizontalDesktopRetinaDown',
        purePropName: 'paddingHorizontal',
        behavior: 'down',
        breakpoint: {
          name: 'desktopRetina',
          isDefault: false,
        },
      })
    })

    it('ignores matching breakpoint in wrong casing', () => {
      expect(parsePropName('gaptablet')).toEqual({
        originPropName: 'gaptablet',
        purePropName: 'gaptablet',
        behavior: 'up',
        breakpoint: {
          name: 'mobile',
          isDefault: true,
        },
      })
    })

    it('ignores matching behavior in wrong casing', () => {
      expect(parsePropName('templateonly')).toEqual({
        originPropName: 'templateonly',
        purePropName: 'templateonly',
        behavior: 'up',
        breakpoint: {
          name: 'mobile',
          isDefault: true,
        },
      })
    })

    it('ignores matching breakpoint and behavior in wrong casing', () => {
      expect(parsePropName('templatetabletonly')).toEqual({
        originPropName: 'templatetabletonly',
        purePropName: 'templatetabletonly',
        behavior: 'up',
        breakpoint: {
          name: 'mobile',
          isDefault: true,
        },
      })
    })

    it('ignores unknown suffixes', () => {
      expect(parsePropName('gapFoo')).toEqual({
        originPropName: 'gapFoo',
        purePropName: 'gapFoo',
        behavior: 'up',
        breakpoint: {
          name: 'mobile',
          isDefault: true,
        },
      })
    })
  })
})
