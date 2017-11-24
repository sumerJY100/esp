1、实例化设备：com.init.InitDevice
	此类实现了ApplicationListener，spring注解
2、定时任务：quartz.TaskStatisticsQuartz【模拟振打时序】,具体配置内容在WEB-INF/spring/quartz/applicationContext-quartz.xml
	每秒对rapper进行遍历，对rapper状态进行判断
		List<Rapper> rapperList = manager.findAll();
		for(Rapper rapper:rapperList){
			if(rapper.runWay == 0 && rapper.runState == 1){
				rapper.setRunState(0);
				update(rapper);
			}else if(rapper.runWay == 1 && rapper.runState == 0){
				rapper.setRunState(1):
				update(rapper);
			}else if(rapper.runWay == 2 && rapper.cyclerunTime > 0){
				long beginTime = 20160101 010101;
				long currentTime = 当前时间;
				long cycleTime = cyclerunTime + cyclewaitTime;
				long restTime = (currentTime - beginTime - cycleBeginTime) %cycleTime;
				if(restTime < cyclerunTime){
					if(runState == 0){
						rapper.setRunState(1);
						update(rapper);
					}
				}else if(restTime > cycleRunTime){
					if(runState == 1){
						rapper.setRunState(0);
						update(rapper);
					}
				}
			}
		}