import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from '@tanstack/react-router'
import { showSubmittedData } from '@/utils/show-submitted-data'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Switch } from '@/components/ui/switch'

const notificationsFormSchema = z.object({
  type: z.enum(['all', 'mentions', 'none'], {
    required_error: 'باید یک نوع اعلان را انتخاب کنید.',
  }),
  mobile: z.boolean().default(false).optional(),
  communication_emails: z.boolean().default(false).optional(),
  social_emails: z.boolean().default(false).optional(),
  marketing_emails: z.boolean().default(false).optional(),
  security_emails: z.boolean(),
})

type NotificationsFormValues = z.infer<typeof notificationsFormSchema>

// This can come from your database or API.
const defaultValues: Partial<NotificationsFormValues> = {
  communication_emails: false,
  marketing_emails: false,
  social_emails: true,
  security_emails: true,
}

export function NotificationsForm() {
  const form = useForm<NotificationsFormValues>({
    resolver: zodResolver(notificationsFormSchema),
    defaultValues,
  })

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => showSubmittedData(data))}
        className='space-y-8'
      >
        <FormField
          control={form.control}
          name='type'
          render={({ field }) => (
            <FormItem className='relative space-y-3'>
              <FormLabel>به من اطلاع بده درباره...</FormLabel>
              <FormControl>
                <RadioGroup
                  dir='rtl'
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className='flex flex-col space-y-1'
                >
                  <FormItem className='flex items-center space-y-0 space-x-3'>
                    <FormControl>
                      <RadioGroupItem value='all' />
                    </FormControl>
                    <FormLabel className='font-normal'>
                      همه پیام‌های جدید
                    </FormLabel>
                  </FormItem>
                  <FormItem className='flex items-center space-y-0 space-x-3'>
                    <FormControl>
                      <RadioGroupItem value='mentions' />
                    </FormControl>
                    <FormLabel className='font-normal'>
                      پیام‌های مستقیم و اشاره‌ها
                    </FormLabel>
                  </FormItem>
                  <FormItem className='flex items-center space-y-0 space-x-3'>
                    <FormControl>
                      <RadioGroupItem value='none' />
                    </FormControl>
                    <FormLabel className='font-normal'>هیچ‌کدام</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='relative'>
          <h3 className='mb-4 text-lg font-medium'>اعلان‌های ایمیل</h3>
          <div className='space-y-4'>
            <FormField
              control={form.control}
              name='communication_emails'
              render={({ field }) => (
                <FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
                  <div className='space-y-0.5'>
                    <FormLabel className='text-base'>
                      ایمیل‌های ارتباطی
                    </FormLabel>
                    <FormDescription>
                      ایمیل‌هایی درباره فعالیت حساب خود دریافت کنید.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='marketing_emails'
              render={({ field }) => (
                <FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
                  <div className='space-y-0.5'>
                    <FormLabel className='text-base'>
                      ایمیل‌های بازاریابی
                    </FormLabel>
                    <FormDescription>
                      ایمیل‌هایی درباره محصولات جدید، ویژگی‌ها و موارد دیگر
                      دریافت کنید.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='social_emails'
              render={({ field }) => (
                <FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
                  <div className='space-y-0.5'>
                    <FormLabel className='text-base'>
                      ایمیل‌های اجتماعی
                    </FormLabel>
                    <FormDescription>
                      ایمیل‌هایی برای درخواست‌های دوستی، دنبال‌کردن‌ها و موارد
                      دیگر دریافت کنید.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='security_emails'
              render={({ field }) => (
                <FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
                  <div className='space-y-0.5'>
                    <FormLabel className='text-base'>
                      ایمیل‌های امنیتی
                    </FormLabel>
                    <FormDescription>
                      ایمیل‌هایی درباره فعالیت حساب و امنیت خود دریافت کنید.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled
                      aria-readonly
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>
        <FormField
          control={form.control}
          name='mobile'
          render={({ field }) => (
            <FormItem className='relative flex flex-row items-start space-y-0 space-x-3'>
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className='space-y-1 leading-none'>
                <FormLabel>
                  از تنظیمات متفاوتی برای دستگاه‌های موبایل من استفاده کن
                </FormLabel>
                <FormDescription>
                  می‌توانید اعلان‌های موبایل خود را در{' '}
                  <Link
                    to='/settings'
                    className='underline decoration-dashed underline-offset-4 hover:decoration-solid'
                  >
                    تنظیمات موبایل
                  </Link>{' '}
                  صفحه مدیریت کنید.
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
        <Button type='submit'>به‌روزرسانی اعلان‌ها</Button>
      </form>
    </Form>
  )
}
