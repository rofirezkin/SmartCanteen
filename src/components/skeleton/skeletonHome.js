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
    }
];