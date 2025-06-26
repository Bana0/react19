import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
// import './index.scss'
import { useState } from 'react'

const formSchema = z.object({
  account: z.string().min(2, {
    message: '账号必须至少包含2个字符。',
  }),
  password: z.string(),
  name: z.string().min(2, {
    message: '姓名必须至少包含2个字符。',
  }),
  phone: z.coerce.string(),
  systemName: z.string(),
  logo: z.string(),
  remark: z.string(),

  percentage: z.coerce.number().refine((value) => value >= 0 && value <= 100, {
    message: '套餐提成百分比必须是0到100之间的数字。',
  }),
  membersNumber: z.coerce.number().refine((value) => value >= 0, {
    message: '成员数量必须是大于或等于0的数字。',
  }),
  accountsNumber: z.coerce.number().refine((value) => value >= 0, {
    message: '媒体账号数量必须是大于或等于0的数字。',
  }),
  deviceNumber: z.coerce.number().refine((value) => value >= 0, {
    message: '云设备数量必须是大于或等于0的数字。',
  }),

  percentage1: z.coerce.number().refine((value) => value >= 0 && value <= 100, {
    message: '套餐提成百分比必须是0到100之间的数字。',
  }),
  membersNumber1: z.coerce.number().refine((value) => value >= 0, {
    message: '成员数量必须是大于或等于0的数字。',
  }),
  accountsNumber1: z.coerce.number().refine((value) => value >= 0, {
    message: '媒体账号数量必须是大于或等于0的数字。',
  }),
  deviceNumber1: z.coerce.number().refine((value) => value >= 0, {
    message: '云设备数量必须是大于或等于0的数字。',
  }),
  // age: z.coerce // 添加 coerce 转换
  //   .number()
  //   .min(18, {
  //     message: '年龄必须大于18岁。',
  //   })
  //   .refine((value) => value % 2 === 0, {
  //     message: '年龄必须是偶数。',
  //   }),
})

const About = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      account: '',
      password: '',
      name: '',
      phone: '',
      systemName: '',
      logo: '',
      remark: '',

      percentage: 0,
      membersNumber: 0,
      accountsNumber: 0,
      deviceNumber: 0,

      percentage1: 0,
      membersNumber1: 0,
      accountsNumber1: 0,
      deviceNumber1: 0,
    },
  })
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values)
  }
  const [show1, setShow1] = useState(true)
  const [show2, setShow2] = useState(true)
  const [show3, setShow3] = useState(true)
  return (
    <div className="ml-auto mr-auto max-w-2xl p-4 border border-gray-200 rounded-lg border-dashed">
      <Form {...form}>
        <div>
          <div className="flex justify-between items-center">
            <div className="font-bold">基本信息</div>
            <div className="font-thin text-xs" onClick={() => setShow1(!show1)}>
              {show1 ? '收起' : '展开'}
            </div>
          </div>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {show1 && (
              <div className="space-y-6">
                <hr className="w-full mt-1.5 mb-1.5" />
                <FormField
                  control={form.control}
                  name="account"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1 label">
                          <FormLabel className="text-red-500">*</FormLabel>
                          <FormLabel className="">账号</FormLabel>
                        </div>
                        <div className="flex-1">
                          <FormControl>
                            <Input placeholder="请输入账号" {...field} />
                          </FormControl>
                          <FormMessage />
                        </div>
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center gap-4">
                        <FormLabel className="label">密码</FormLabel>
                        <div className="flex-1">
                          <FormControl>
                            <Input type="password" placeholder="请输入密码" {...field} />
                          </FormControl>
                          <FormMessage />
                          <FormDescription className="mt-1.5">密码必须至少包含8个字符，包括字母和数字。</FormDescription>
                        </div>
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1 label">
                          <FormLabel className="text-red-500">*</FormLabel>
                          <FormLabel className="">姓名</FormLabel>
                        </div>
                        <div className="flex-1">
                          <FormControl>
                            <Input placeholder="请输入姓名" {...field} />
                          </FormControl>
                          <FormMessage />
                        </div>
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center gap-4">
                        <FormLabel className="label">联系方式</FormLabel>
                        <div className="flex-1">
                          <FormControl>
                            <Input type="number" placeholder="请输入联系方式" {...field} />
                          </FormControl>
                          <FormMessage />
                        </div>
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  name="systemName"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center gap-4">
                        <FormLabel className="label">系统名称</FormLabel>
                        <div className="flex-1">
                          <FormControl>
                            <Input placeholder="请输入系统名称" {...field} />
                          </FormControl>
                          <FormMessage />
                        </div>
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  name="logo"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center gap-4">
                        <FormLabel className="label">LOGO</FormLabel>
                        <div className="flex-1">
                          <FormControl className="w-[100px] h-[100px] bg-amber-200">
                            <Input type="file" placeholder="" {...field} />
                          </FormControl>
                          <FormMessage />
                          <FormDescription className="mt-1.5">选择您的LOGO，格式为XXXXX</FormDescription>
                        </div>
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  name="remark"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center gap-4">
                        <FormLabel className="label">备注</FormLabel>
                        <div className="flex-1">
                          <FormControl>
                            <Input className="h-[100px]" type="text" placeholder="" {...field} />
                          </FormControl>
                          <FormMessage />
                        </div>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            )}

            <div className="flex justify-between items-center">
              <div className="font-bold">费率设置</div>
              <div className="font-thin text-xs" onClick={() => setShow2(!show2)}>
                {show2 ? '收起' : '展开'}
              </div>
            </div>
            {show2 && (
              <div className="space-y-6">
                <hr className="w-full" />
                <div className="font-bold text-sm">PRO版</div>
                <FormField
                  control={form.control}
                  name="percentage"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1 label">
                          <FormLabel className="text-red-500">*</FormLabel>
                          <FormLabel className="">套餐提成</FormLabel>
                        </div>
                        <div className="w-[150px]">
                          <FormControl>
                            <div className="relative">
                              <Input type="number" placeholder="" {...field} />
                              <div className="absolute right-1 top-1/2 -translate-y-1/2 text-xs">%</div>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </div>
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="membersNumber"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1 label">
                          <FormLabel className="text-red-500">*</FormLabel>
                          <FormLabel className="">成员数</FormLabel>
                        </div>
                        <div className="w-[150px]">
                          <FormControl>
                            <div className="relative">
                              <Input type="number" placeholder="" {...field} />
                              <div className="absolute right-1 top-1/2 -translate-y-1/2 text-xs ">个/天</div>
                              <div className="absolute left-1 top-1/2 -translate-y-1/2 text-xs">$</div>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </div>
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="accountsNumber"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1 label">
                          <FormLabel className="text-red-500">*</FormLabel>
                          <FormLabel className="">社媒账号数</FormLabel>
                        </div>
                        <div className="w-[150px]">
                          <FormControl>
                            <div className="relative">
                              <Input type="number" placeholder="" {...field} />
                              <div className="absolute right-1 top-1/2 -translate-y-1/2 text-xs ">个/天</div>
                              <div className="absolute left-1 top-1/2 -translate-y-1/2 text-xs">$</div>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </div>
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="deviceNumber"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1 label">
                          <FormLabel className="text-red-500">*</FormLabel>
                          <FormLabel className="">云设备数</FormLabel>
                        </div>
                        <div className="w-[150px]">
                          <FormControl>
                            <div className="relative">
                              <Input type="number" placeholder="" {...field} />
                              <div className="absolute right-1 top-1/2 -translate-y-1/2 text-xs ">个/天</div>
                              <div className="absolute left-1 top-1/2 -translate-y-1/2 text-xs">$</div>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </div>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            )}

            <div className="flex justify-between items-center">
              <div className="font-bold">费率设置</div>
              <div className="font-thin text-xs cursor-pointer" onClick={() => setShow3(!show3)}>
                {show3 ? '收起' : '展开'}
              </div>
            </div>
            {show3 && (
              <div className="space-y-6">
                <hr className="w-full" />
                <div className="font-bold text-sm">MAX版</div>
                <FormField
                  control={form.control}
                  name="percentage1"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1 label">
                          <FormLabel className="text-red-500">*</FormLabel>
                          <FormLabel className="">套餐提成</FormLabel>
                        </div>
                        <div className="w-[150px]">
                          <FormControl>
                            <div className="relative">
                              <Input type="number" placeholder="" {...field} />
                              <div className="absolute right-1 top-1/2 -translate-y-1/2 text-xs">%</div>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </div>
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="membersNumber1"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1 label">
                          <FormLabel className="text-red-500">*</FormLabel>
                          <FormLabel className="">成员数</FormLabel>
                        </div>
                        <div className="w-[150px]">
                          <FormControl>
                            <div className="relative">
                              <Input type="number" placeholder="" {...field} />
                              <div className="absolute right-1 top-1/2 -translate-y-1/2 text-xs ">个/天</div>
                              <div className="absolute left-1 top-1/2 -translate-y-1/2 text-xs">$</div>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </div>
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="accountsNumber1"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1 label">
                          <FormLabel className="text-red-500">*</FormLabel>
                          <FormLabel className="">社媒账号数</FormLabel>
                        </div>
                        <div className="w-[150px]">
                          <FormControl>
                            <div className="relative">
                              <Input type="number" placeholder="" {...field} />
                              <div className="absolute right-1 top-1/2 -translate-y-1/2 text-xs ">个/天</div>
                              <div className="absolute left-1 top-1/2 -translate-y-1/2 text-xs">$</div>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </div>
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="deviceNumber1"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1 label">
                          <FormLabel className="text-red-500">*</FormLabel>
                          <FormLabel className="">云设备数</FormLabel>
                        </div>
                        <div className="w-[150px]">
                          <FormControl>
                            <div className="relative">
                              <Input type="number" placeholder="" {...field} />
                              <div className="absolute right-1 top-1/2 -translate-y-1/2 text-xs ">个/天</div>
                              <div className="absolute left-1 top-1/2 -translate-y-1/2 text-xs">$</div>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </div>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            )}
            <div className="text-center gap-4 flex justify-center">
              <Button type="submit" variant="outline">
                取消
              </Button>
              <Button type="submit" className="bg-blue-500">
                确定
              </Button>
            </div>
          </form>
        </div>
      </Form>
    </div>
  )
}
export default About
