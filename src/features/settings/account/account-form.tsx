import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { CalendarIcon, CaretSortIcon, CheckIcon } from '@radix-ui/react-icons'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns-jalali'
import { cn } from '@/lib/utils'
import { showSubmittedData } from '@/utils/show-submitted-data'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

const languages = [
  { label: 'انگلیسی', value: 'en' },
  { label: 'فرانسوی', value: 'fr' },
  { label: 'آلمانی', value: 'de' },
  { label: 'اسپانیایی', value: 'es' },
  { label: 'پرتغالی', value: 'pt' },
  { label: 'روسی', value: 'ru' },
  { label: 'ژاپنی', value: 'ja' },
  { label: 'کره‌ای', value: 'ko' },
  { label: 'چینی', value: 'zh' },
] as const

const accountFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: 'نام باید حداقل ۲ کاراکتر باشد.',
    })
    .max(30, {
      message: 'نام نباید بیشتر از ۳۰ کاراکتر باشد.',
    }),
  dob: z.date({
    required_error: 'تاریخ تولد الزامی است.',
  }),
  language: z.string({
    required_error: 'لطفاً یک زبان را انتخاب کنید.',
  }),
})

type AccountFormValues = z.infer<typeof accountFormSchema>

// This can come from your database or API.
const defaultValues: Partial<AccountFormValues> = {
  name: '',
}

export function AccountForm() {
  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues,
  })

  function onSubmit(data: AccountFormValues) {
    showSubmittedData(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>نام</FormLabel>
              <FormControl>
                <Input placeholder='نام شما' {...field} />
              </FormControl>
              <FormDescription>
                این نامی است که در پروفایل شما و در ایمیل‌ها نمایش داده خواهد
                شد.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='dob'
          render={({ field }) => (
            <FormItem className='flex flex-col'>
              <FormLabel>تاریخ تولد</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'w-[240px] pr-3 text-right font-normal',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      {field.value ? (
                        format(field.value, 'd MMMM, yyyy')
                      ) : (
                        <span>انتخاب تاریخ</span>
                      )}
                      <CalendarIcon className='mr-auto h-4 w-4 opacity-50' />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className='w-auto p-0' align='start'>
                  <Calendar
                    mode='single'
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date: Date) =>
                      date > new Date() || date < new Date('1900-01-01')
                    }
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                تاریخ تولد شما برای محاسبه سن شما استفاده می‌شود.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='language'
          render={({ field }) => (
            <FormItem className='flex flex-col'>
              <FormLabel>زبان</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant='outline'
                      role='combobox'
                      className={cn(
                        'w-[200px] justify-between',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      {field.value
                        ? languages.find(
                            (language) => language.value === field.value
                          )?.label
                        : 'انتخاب زبان'}
                      <CaretSortIcon className='mr-2 h-4 w-4 shrink-0 opacity-50' />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className='w-[200px] p-0'>
                  <Command>
                    <CommandInput placeholder='جستجوی زبان...' />
                    <CommandEmpty>زبانی یافت نشد.</CommandEmpty>
                    <CommandGroup>
                      <CommandList>
                        {languages.map((language) => (
                          <CommandItem
                            value={language.label}
                            key={language.value}
                            onSelect={() => {
                              form.setValue('language', language.value)
                            }}
                          >
                            <CheckIcon
                              className={cn(
                                'ml-2 h-4 w-4',
                                language.value === field.value
                                  ? 'opacity-100'
                                  : 'opacity-0'
                              )}
                            />
                            {language.label}
                          </CommandItem>
                        ))}
                      </CommandList>
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormDescription>
                این زبانی است که در داشبورد استفاده خواهد شد.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit'>به‌روزرسانی حساب</Button>
      </form>
    </Form>
  )
}
