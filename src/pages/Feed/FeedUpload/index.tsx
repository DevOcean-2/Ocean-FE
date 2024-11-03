import { MainLayout, ScrollLayout } from '@/src/pages/Feed/ui';
import { FeedUploadHeader } from '@/src/widgets/PageHeaders';
import AlbumImageSelector from '@/src/shared/ui/AlbumImageSelector';

const FeedUpload = () => {
  return (
    <MainLayout>
      <FeedUploadHeader />
      <ScrollLayout>
        <AlbumImageSelector />
      </ScrollLayout>
    </MainLayout>
  );
};

export default FeedUpload;
