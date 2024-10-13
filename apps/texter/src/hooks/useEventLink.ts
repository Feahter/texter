import { EventEmitter } from 'events';
import { useEffect, useMemo } from 'react';

/** 全局通用事件线程 */
export const GlobalEmitter = new EventEmitter();

GlobalEmitter.setMaxListeners(100);

/**
 * 通用事件发布器
 * @param eventObject - 事件对象，键为事件名，值为事件处理器
 * @param emitter - 自定义的事件发射器（可选）
 */
export const useEventLink = (
  eventObject: Record<string, (args: any) => void>,
  emitter?: EventEmitter
) => {
  const eventEmitter = useMemo(() => emitter || GlobalEmitter, [emitter]);

  // 将事件对象转换为数组，以便于遍历
  const eventList = useMemo(() => Object.entries(eventObject), [eventObject]);

  useEffect(() => {
    // 注册事件处理器
    const registerEventHandlers = () => {
      eventList.forEach(([eventName, eventHandler]) => {
        eventEmitter.on(eventName, eventHandler);
      });
    };

    // 注销事件处理器
    const unregisterEventHandlers = () => {
      eventList.forEach(([eventName, eventHandler]) => {
        eventEmitter.off(eventName, eventHandler);
      });
    };

    registerEventHandlers();

    // 组件卸载时注销事件处理器
    return () => {
      unregisterEventHandlers();
    };
  }, [eventList, eventEmitter]);
};

export default useEventLink;
