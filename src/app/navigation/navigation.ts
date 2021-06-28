import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id       : 'applications',
        title    : 'Applications',
        //translate: 'NAV.APPLICATIONS',
        type     : 'group',
        children : [
            {
                id       : 'dashboard',
                title    : 'Dashboard',
                //translate: 'NAV.SAMPLE.TITLE',
                type     : 'item',
                icon     : 'dashboard',
                url      : '/dashboard',
                badge    : {
                    title    : '1',
                    //translate: 'NAV.SAMPLE.BADGE',
                    bg       : '#F44336',
                    fg       : '#FFFFFF'
                }
            },
            {
                'id'       : 'company',
                'title'    : 'Companies',
                //'translate': 'NAV.DATATABLES',
                'type'     : 'collapsable',
                'icon'     : 'business',
                'children' : [
                    {
                        'id'   : 'add-company',
                        'title': 'Add company',
                        'type' : 'item',
                        'url'  : '/company/new',
                        hidden : true
                    },
                    {
                        'id'   : 'list-company',
                        'title': 'Company List',
                        'type' : 'item',
                        'url'  : '/companies'
                    }
                ],
                hidden:true
            },
            {
                'id'       : 'product',
                'title'    : 'Products',
                //'translate': 'NAV.DATATABLES',
                'type'     : 'collapsable',
                'icon'     : 'category',
                'children' : [
                    {
                        'id'   : 'add-product',
                        'title': 'Add product',
                        'type' : 'item',
                        'url'  : '/product/new',
                        hidden : true
                    },
                    {
                        'id'   : 'list-product',
                        'title': 'Product List',
                        'type' : 'item',
                        'url'  : '/products'
                    }
                ],
                hidden:true
            },
            {
                'id'       : 'presentation',
                'title'    : 'Presentations',
                //'translate': 'NAV.DATATABLES',
                'type'     : 'collapsable',
                'icon'     : 'show_chart',
                'children' : [
                    {
                        'id'   : 'add-presentation',
                        'title': 'Add presentation',
                        'type' : 'item',
                        'url'  : '/presentation/new',
                        hidden : true
                    },
                    {
                        'id'   : 'list-presentation',
                        'title': 'Presentation List',
                        'type' : 'item',
                        'url'  : '/presentations'
                    }
                ],
                hidden:true
            },
            {
                'id'       : 'project',
                'title'    : 'Projects',
                //'translate': 'NAV.DATATABLES',
                'type'     : 'collapsable',
                'icon'     : 'work',
                'children' : [
                    {
                        'id'   : 'add-project',
                        'title': 'Add project',
                        'type' : 'item',
                        'url'  : '/project/new',
                        hidden : true
                    },
                    {
                        'id'   : 'list-project',
                        'title': 'Project List',
                        'type' : 'item',
                        'url'  : '/projects'
                    }
                ],
                hidden:true
            },
            {
                'id'       : 'media',
                'title'    : 'Medias',
                //'translate': 'NAV.DATATABLES',
                'type'     : 'collapsable',
                'icon'     : 'movie',
                'children' : [
                    {
                        'id'   : 'add-media',
                        'title': 'Add media',
                        'type' : 'item',
                        'url'  : '/media/new',
                        hidden : true
                    },
                    {
                        'id'   : 'list-media',
                        'title': 'Media List',
                        'type' : 'item',
                        'url'  : '/medias'
                    }
                ],
                hidden:true
            },
            {
                'id'       : 'reference',
                'title'    : 'References',
                //'translate': 'NAV.DATATABLES',
                'type'     : 'collapsable',
                'icon'     : 'layers',
                'children' : [
                    {
                        'id'   : 'add-reference',
                        'title': 'Add reference',
                        'type' : 'item',
                        'url'  : '/reference/new',
                        hidden : true
                    },
                    {
                        'id'   : 'list-reference',
                        'title': 'Reference List',
                        'type' : 'item',
                        'url'  : '/references'
                    }
                ],
                hidden:true
            },
        ]
    }
];
