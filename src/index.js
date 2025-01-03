import { default as WJElement } from "./wj-element/wj-element.js";
import { defaultStoreActions, store } from "./wj-store/store.js";

import { sk } from "./translations/sk.js";
import { en } from "./translations/en.js";
import { he } from "./translations/he.js";
import { Localizer } from "./utils/localize.js";

import { Aside } from "./wj-aside/aside.js";
import {Button} from './wj-button/button.js';
import {Label} from './wj-label/label.js';
import {Container} from './wj-container/container.js';
import {Input} from './wj-input/input.js';
import {Form} from './wj-form/form.js';
import {Item} from './wj-item/item.js';
import {List} from './wj-list/list.js';
import {Icon} from './wj-icon/icon.js';
import {Animation} from './wj-animation/animation.js';
import {Avatar} from './wj-avatar/avatar.js';
import {Img} from './wj-img/img.js';
import {Badge} from './wj-badge/badge.js';
import {Breadcrumb} from './wj-breadcrumb/breadcrumb.js';
import {Breadcrumbs} from './wj-breadcrumbs/breadcrumbs.js';
import {ButtonGroup} from './wj-button-group/button-group.js';
import {Card} from './wj-card/card.js';
import {CardContent} from './wj-card-content/card-content.js';
import {CardControls} from './wj-card-controls/card-controls.js';
import {CardHeader} from './wj-card-header/card-header.js';
import {CardSubtitle} from './wj-card-subtitle/card-subtitle.js';
import {CardTitle} from './wj-card-title/card-title.js';
import {Carousel} from './wj-carousel/carousel.js';
import {CarouselItem} from './wj-carousel-item/carousel-item.js';
import {Checkbox}  from './wj-checkbox/checkbox.js';
import {Chip}  from './wj-chip/chip.js';
import {Col}  from './wj-col/col.js';
//import {ColorPicker} from './wj-color-picker/color-picker.js';
import {CopyButton} from './wj-copy-button/copy-button.js';
import {Dialog} from './wj-dialog/dialog.js';
import {Divider} from './wj-divider/divider.js';
import {Popup} from './wj-popup/popup.js';
 //31-05-2024
import {Dropdown} from './wj-dropdown/dropdown.js';
import {Myflatpickr} from './wj-myflatpickr/myflatpickr.js';
import {Footer} from './wj-footer/footer.js';
import {FormatDigital} from './wj-format-digital/format-digital.js';
import {Grid} from './wj-grid/grid.js';
import {Header} from './wj-header/header.js';
//tags.json not found 404
//import {IconPicker} from './wj-icon-picker/icon-picker.js';
import {InfiniteScroll} from './wj-infinite-scroll/infinite-scroll.js';
import {Tooltip} from './wj-tooltip/tooltip.js';
import {ImgComparer} from './wj-img-comparer/img-comparer.js';
import {InputFile} from './wj-input-file/input-file.js';

import {Main} from './wj-main/main.js';
//Module not found: Error: Can't resolve 'process/browser'
//import {Masonry} from './wj-masonry/masonry.js';
import {Toast} from './wj-toast/toast.js';

import {Menu} from './wj-menu/menu.js'
import {MenuButton} from './wj-menu-button/menu-button.js'
import {MenuItem} from './wj-menu-item/menu-item.js'
import {MenuLabel} from './wj-menu-label/menu-label.js'

import {Option} from './wj-option/option.js';
import {Options} from './wj-options/options.js';
import {Panel} from './wj-panel/panel.js';
import {Paginator} from './wj-paginator/paginator.js';
import {ProgressBar} from './wj-progress-bar/progress-bar.js';
import {Radio} from './wj-radio/radio.js';
import {RadioGroup} from './wj-radio-group/radio-group.js';
import {Rate} from './wj-rate/rate.js';
import {RelativeTime} from './wj-relative-time/relative-time.js';

import {Row} from './wj-row/row.js';
import {Select} from './wj-select/select.js';
import {Slider} from './wj-slider/slider.js';
import {SplitView} from './wj-split-view/split-view.js';

import {Table} from './wj-table/table.js';
import {default as TableSearchElement} from './wj-table/components/wj-search/search.js';
import {default as FilterSimple} from './wj-table/components/wj-filter-simple/filter-simple.js';
import {default as TableOptions} from './wj-table/components/wj-options/options.js';
import {default as FilterSave}  from './wj-table/components/wj-filter-save/filter-save.js';
import {default as FilterAdvanced} from './wj-table/components/wj-filter-advanced/filter-advanced.js';
import {default as FilterDropdown} from './wj-table/components/wj-filter-dropdown/filter-dropdown.js';
import {Tab} from './wj-tab/tab.js';
import {TabGroup} from './wj-tab-group/tab-group.js';
import {TabPanel} from './wj-tab-panel/tab-panel.js';
import {Textarea} from './wj-textarea/textarea.js';
import {Thumbnail} from './wj-thumbnail/thumbnail.js';
import {Toggle} from './wj-toggle/toggle.js';
import {Toolbar} from './wj-toolbar/toolbar.js';
import {ToolbarAction} from './wj-toolbar-action/toolbar-action.js';
import {VisuallyHidden} from './wj-visually-hidden/visually-hidden.js';

import {LayoutTransfer} from './wj-layout-transfer/layout-transfer.js';
import {LayoutTwoColumns} from './wj-layout-two-columns/layout-two-columns.js';


import {Wizard} from './wj-wizard/wizard.js';
import {WizardNav} from './wj-wizard-nav/wizard-nav.js';
import {WizardButton} from './wj-wizard-button/wizard-button.js';
import {WizardStep} from './wj-wizard-step/wizard-step.js';
//MG_COMPONENTS
import {NumberFormatter} from './mg-number-formatter/number-formatter.js';

export { WJElement, defaultStoreActions, store
	,Animation
	,Aside
	,Avatar
	,Badge
	,Button
	,Breadcrumb
	,Breadcrumbs
	,ButtonGroup
	,Card
	,CardContent
	,CardControls
	,CardHeader
	,CardSubtitle
	,CardTitle
	,Carousel
	,CarouselItem
	,Checkbox
	,Chip
	,Col
	,Container
	//,ColorPicker
	,CopyButton
	,Divider
	,Dialog
	//31-05-2024
	,Dropdown
	,Footer
	,FormatDigital
	,Grid
	,Header
	,Label
	,Input
	//,Myflatpickr
	,Form
	,Item
	,List
	,Icon
	,Localizer
	,Img
	//,IconPicker
	,InfiniteScroll
	,Tooltip
	/*,ImgComparer */
	,InputFile
	,Main
	//Module not found: Error: Can't resolve 'process/browser'
	//,Masonry
	,Toast
	,Menu
	,MenuButton
	,MenuItem
	,MenuLabel
	,Option
	,Options
	,Panel
	,Paginator
	,Popup
	,ProgressBar
	,Radio
	,RadioGroup
	,Rate
	,RelativeTime
	,Row
	,Select
	,Slider
	,SplitView	
	,Tab
	,Table
	,FilterSimple
	,TableOptions
	,FilterSave
	,FilterAdvanced
	,FilterDropdown
	,TableSearchElement
	,TabGroup
	,TabPanel
	,Textarea
	,Thumbnail
	,Toggle
	,Toolbar
	,ToolbarAction
	,VisuallyHidden
	,LayoutTransfer
	,LayoutTwoColumns
	,Wizard
	,WizardNav
	,WizardButton
	,WizardStep
 
 
 //MG_COMPONENTS
 ,NumberFormatter
 
};