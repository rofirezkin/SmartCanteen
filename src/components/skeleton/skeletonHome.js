export const skeletonHome = [
    {
        key: 'header',
        marginTop: 20,
        marginLeft: 20,
        flexDirection: 'row',
        children: [
            {
                key: 'image',
                width: 50,
                height: 50,
                borderRadius: 50/2
            },
            {
                key: 'containerName',
                marginLeft: 10,
                children: [
                    {
                        key: 'name',
                        width: 250,
                        height: 25,
                        marginBottom: 5,
                    },
                    {
                        key: 'status',
                        width: 150,
                        height: 15,
                        marginBottom: 15
                    }
                ]
            }
        ],
    },
    {
        key: 'poster',
        flexDirection: 'row',
        marginTop: 20,
        marginLeft: 20,
        children:[
            {
                key: 'posterContent',
                height: 115,
                width: 295,
                marginRight: 10
            },
            {
                key: 'posterContent2',
                height: 115,
                width: 295,
            }
        ]
    },
    {
        key: 'textReady',
        marginTop: 25,
        height: 20,
        width: 200,
        marginLeft: 20,
    },
    {
        key: 'method',
        marginTop: 15,
        marginLeft: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        children: [
            {
                key: 'optionUser',
                marginTop: 5,
                children: [
                    {
                        key: 'contentUser',
                        width: 62,
                        height: 62
                    },
                    {
                        key: 'textOptionUser',
                        marginTop: 10,
                        width: 62,
                        height: 15
                    }
                ]
            },
            {
                key: 'optionUser2',
                marginTop: 5,
                children: [
                    {
                        key: 'contentUser2',
                        width: 62,
                        height: 62
                    },
                    {
                        key: 'textOptionUser2',
                        marginTop: 10,
                        width: 62,
                        height: 15
                    }
                ]
            },
            {
                key: 'optionUser3',
                marginTop: 5,
                children: [
                    {
                        key: 'contentUser3',
                        width: 62,
                        height: 62
                    },
                    {
                        key: 'textOptionUser3',
                        marginTop: 10,
                        width: 62,
                        height: 15
                    }
                ]
            },
            {
                key: 'optionUser4',
                marginTop: 5,
                marginRight: 20,
                children: [
                    {
                        key: 'contentUser4',
                        width: 62,
                        height: 62
                    },
                    {
                        key: 'textOptionUser4',
                        marginTop: 10,
                        width: 62,
                        height: 15
                    }
                ]
            }
        ]
    },
    {
        key: 'textBestSeller',
        marginTop: 25,
        marginLeft: 20,
        width:120,
        height: 20
    },
    {
        key: 'contentBestSeller',
        marginTop: 10,
        marginLeft: 20,
        flexDirection: 'row',
        children:[
            {
                key: 'cardBestSeller',
                width: 200,
                height: 240,
                marginRight: 10
            },
            {
                key: 'cardBestSeller2',
                width: 200,
                height: 240,
            }
        ]
    },
    {
        key: 'tabView',
        marginTop: 25,
        flexDirection: 'row',
        flex: 1,
        width: 'auto',
        height: 300
    }
    
];