import PptxGenJS from 'pptxgenjs'
import * as Template from '@Config/PowerPointTemplate'

const Powerpoint = require('pptxgenjs')

type PowerPointModuleFunction = () => PptxGenJS

const Wrapper: PowerPointModuleFunction = () => {
  const powerpoint: PptxGenJS = new Powerpoint()
  const config = Template.Config

  /**
   * Add user metadata to powerpoint project,
   * this data may or may not be personal.
   */
  powerpoint.author = config.metadata.author
  powerpoint.company = config.metadata.company
  powerpoint.revision = config.metadata.revision
  powerpoint.subject = config.metadata.subject
  powerpoint.title = config.metadata.title

  /**
   * Configure the layout of the project in power point,
   * note that the example below defines that the
   * project should have similar proportions to the
   * instagram slides.
   */
  powerpoint.defineLayout(config.defineLayout)
  powerpoint.layout = config.defineLayout.name
  powerpoint.rtlMode = config.others.rtlMode

  // TODO: Slider Master
  powerpoint.defineSlideMaster({
    title: 'MASTER_SLIDE',
    margin: [0.25, 0.25, 0.25, 0.25],
    background: {
      path: 'temp/texture.jpg',
      transparency: 20,
    },
    objects: [
      {
        image: {
          path: 'temp/background.jpg',
          w: '100%',
          h: '100%',
        },
      },
    ],
    slideNumber: {
      fontSize: 23.6,
      align: 'right',
      color: 'ffffff',
      w: '100%',
      h: 0.52,
      y: 10.54,
    },
  })

  /**
   * Return a preconfigured instance of PptxGen
   * as a service from the main file application
   * module.
   */
  return powerpoint
}

export const Context = Wrapper()
