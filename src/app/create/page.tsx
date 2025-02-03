import { draftArticleAction } from '@/actions';
import { exa } from '@/services';
import { redirect } from 'next/navigation';
import EditionSection from './EditionSection';

export default async function Create({ searchParams }: { searchParams: Promise<{ articleUrl: string }>}) {
    const { articleUrl } = await searchParams

    if (!articleUrl) {
        redirect('/')
    }

    const { data } = await exa.getText({ url: articleUrl })
    const text = data?.text

    const streamedText = await draftArticleAction(text!)

    return (
        <EditionSection streamedText={streamedText} />
    )
}