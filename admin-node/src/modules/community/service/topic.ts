import { Inject, Provide } from '@midwayjs/core';
import { BaseService } from '@cool-midway/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { CommunityTopicEntity } from '../entity/topic';

/**
 * 社区话题
 */
@Provide()
export class CommunityTopicService extends BaseService {
  @InjectEntityModel(CommunityTopicEntity)
  communityTopicEntity: Repository<CommunityTopicEntity>;

  async getTrendingTopics() {
    // 1. 从Topic表基于其与Post的多对多关系统计引用数量
    const rawTrending = await this.communityTopicEntity
      .createQueryBuilder('topic')
      .leftJoin('topic.posts', 'post')
      .select('topic.id', 'topicId')
      .addSelect('COUNT(post.id)', 'postCount')
      .groupBy('topic.id')
      .orderBy('postCount', 'DESC')
      .limit(5)
      .getRawMany();

    // 示例返回 rawTrending 类似：
    // [ { topicId: 1, postCount: '10' }, { topicId: 2, postCount: '8' }, ... ]

    // 2. 从结果中抽取 Topic ID 数组
    const topicIds = rawTrending.map(item => item.topicId);
    if (topicIds.length === 0) {
      return { data: [] };
    }

    // 3. 查询完整的 Topic 实体
    const topics = await this.communityTopicEntity.findByIds(topicIds);

    // 4. 按照统计结果排序并合并引用数量
    const trendingTopics = topicIds.map(id => {
      const topic = topics.find(topic => topic.id === id);
      const countInfo = rawTrending.find(item => item.topicId === id);
      return {
        ...topic,
        postCount: countInfo ? Number(countInfo.postCount) : 0,
      };
    });

    return trendingTopics;
  }
}
