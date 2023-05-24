/*
 * @Description: 
 * @Date: 2023-05-24 16:29:53
 * @Autor: tangshuze
 * @LastEditTime: 2023-05-24 16:30:00
 * @FilePath: \vite+vue3+ts\mock\module\api2.ts
 */
import Mock from "mockjs";
export default [
    // AddGoods
    {
        url: "/api/addgoods",
        type: "post",
        response: function (option: any) {
            const $name = JSON.parse(option.body).name;
            if ($name) {
                return Mock.mock({
                    status: 200,
                    message: "提交成功",
                    data: {
                        goods: [
                            {
                                name: "MacbookPro",
                                num: 1,
                            },
                            {
                                name: "ipad",
                                num: 2,
                            },
                        ],
                    },
                });
            } else {
                return Mock.mock({
                    status: 400,
                    message: "未提交参数",
                });
            }
        },
    },
];