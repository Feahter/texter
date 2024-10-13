/*
 * @Author: Arthur arthur@lwork.com
 * @Date: 2024-03-31 14:43:12
 * @LastEditors: Arthur arthur@lwork.com
 * @LastEditTime: 2024-10-13 17:15:33
 * @FilePath: /gaker/apps/home-page/src/app/hooks/useWindowEvent.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { useEffect, useRef } from 'react';
import { EventType } from '../typings/EventType';

/**
 * 触发一个自定义事件。
 * @param eventName - 事件的名称。
 * @param detail - 事件的详细信息（可选）。
 */
export const windowEventDispatch = (eventName: string, detail?: unknown) => {
  const event = new CustomEvent(eventName, { detail });
  window.dispatchEvent(event);
};

/**通用事件发布订阅器 */
export const useWindowEvent = (
  EventObject: Record<EventType, any>,
  emitter = window
) => {
  const eventHandlers = useRef<Record<string, EventListener>>({});

  useEffect(() => {
    const registerEventHandler = (
      eventName: string,
      eventHandler: EventListener
    ) => {
      if (!(eventName in eventHandlers.current)) {
        emitter.addEventListener(eventName, eventHandler);
        eventHandlers.current[eventName] = eventHandler;
      }
    };

    const unregisterEventHandler = (eventName: string) => {
      if (eventName in eventHandlers.current) {
        emitter.removeEventListener(
          eventName,
          eventHandlers.current[eventName]
        );
        delete eventHandlers.current[eventName];
      }
    };

    const registerEventHandlers = () => {
      Object.entries(EventObject).forEach(([eventName, eventHandler]) => {
        registerEventHandler(eventName, eventHandler);
      });
    };

    const unregisterEventHandlers = () => {
      Object.keys(eventHandlers.current).forEach((eventName) => {
        unregisterEventHandler(eventName);
      });
    };

    registerEventHandlers();

    return () => {
      unregisterEventHandlers();
    };
  }, [EventObject, emitter]);
};

export default useWindowEvent;
