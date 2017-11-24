package quartz;

import java.text.DecimalFormat;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Component;

import com.manager.EpManager;
import com.manager.HeaterManager;
import com.manager.HeaterTempratorManager;
import com.manager.LowDeviceManager;
import com.manager.RapperManager;
import com.pojo.Ep;
import com.pojo.Heater;
import com.pojo.HeaterTemprator;
import com.pojo.LowDevice;
//import manager.UserStatisticsManager;
import com.pojo.Rapper;

//import pojo.UserStatistics;
@Component
public class TaskStatisticsQuartz {
	// @Resource
	// private UserStatisticsManager userStatisticsManager;

	@Resource
	private RapperManager rapperManager;
	@Resource
	private EpManager epManager;
	@Resource
	private LowDeviceManager lowDeviceManager;
	@Resource
	private HeaterManager heaterManager;
	@Resource
	private HeaterTempratorManager heaterTempratorManager;

	public void work() {

		handleEp();

		handleRapper();

		handleHeater();
	}

	/**
	 * 处理加热
	 * 
	 * @author 夏江勇 2016年12月4日 下午4:22:31
	 * 
	 */
	private void handleHeater() {
		List<LowDevice> lowDeviceList = lowDeviceManager.findAll();
		List<Heater> heaterList = heaterManager.findAll();
		List<HeaterTemprator> tList = heaterTempratorManager.findAll();
		for (Heater heater : heaterList) {
			if (null != heater) {
				if (null != heater.getLowDeviceId())
					for (LowDevice lowDevice : lowDeviceList) {
						if (lowDevice.getId().equals(heater.getLowDeviceId())) {
							if (lowDevice.getRunState().equals(heater.getComunication())) {

							} else {
								heater.setComunication(lowDevice.getRunState());
							}
						}
					}

				if (null != heater.getHeaterTempratorId()) {
					for (HeaterTemprator t : tList) {
						if (t.getId().equals(heater.getHeaterTempratorId())) {
							heater.setHeaterTemprator(t);
						}
					}
				}
				if (null != heater.getRunType()) {
					if (heater.getRunType().intValue() == 0) {
						heater.setRunState(0);
					} else if (heater.getRunType().intValue() == 1) {
						heater.setRunState(1);
					} else if (heater.getRunType().intValue() == 2) {
						HeaterTemprator t = heater.getHeaterTemprator();
//						System.out.println(t.getTempratorLower() + "," + t.getTempratorUpper());
						if (null != t.getTempratorLower() && null != t.getTempratorUpper()) {
							if(null == t.getTemprator())
								t.setTemprator(0);
							if (t.getTempratorLower().intValue() < t.getTempratorUpper().intValue()) {
								if (t.getTemprator().intValue() < t.getTempratorLower().intValue()) {
									heater.setRunState(1);
								}
								if (t.getTemprator().intValue() > t.getTempratorUpper().intValue()) {
									heater.setRunState(0);
								}
							}
						}
					}
					if (null != heater.getRunState()) {
						if (null != heater.getHeaterTemprator()) {
							if (null == heater.getHeaterTemprator().getTemprator()) {
								heater.getHeaterTemprator().setTemprator(0);
							}
							if (heater.getRunState().intValue() == 1) {
								int random = ((Math.random() * 100) > 90) ? 1 : 0;
								int temp = heater.getHeaterTemprator().getTemprator().intValue() + random;
								if(temp > 140){
									temp = 140;
								}
								heater.getHeaterTemprator().setTemprator(temp);
							} else if (heater.getRunState().intValue() == 0) {
								int random = ((Math.random() * 100) > 80) ? -1 : 0;
								int temp = heater.getHeaterTemprator().getTemprator().intValue() + random;
								if(temp < 0){
									temp = 0;
								}
								heater.getHeaterTemprator().setTemprator(temp);
							}
						}
					}
				}
			}
		}
		heaterManager.bathUpdate(heaterList);
		heaterTempratorManager.bathUpdate(tList);
	}

	/**
	 * 处理EP
	 * 
	 * @author 夏江勇 2016年12月4日 上午9:38:26
	 * 
	 */
	private void handleEp() {
		List<Ep> epList = epManager.findAll();
		// System.out.println(epList.get(0).getName());
		for (Ep ep : epList) {
			// System.out.println(ep.getPrimaryVoltageReading());
			if (ep.getCommunicationFlag().intValue() == 0) {
				// 通讯正常
				if (ep.getRunState().intValue() == Ep.EP_RUN_STATE_NORMAL) {
					ep.setPrimaryCurrentReading(0f);
					ep.setPrimaryVoltageReading(380f);
					ep.setSecondCurrentReading(0f);
					ep.setSecondVoltagePeakReading(0);
					ep.setSecondVoltageReading(0f);
					ep.setSparkReading(0);
				} else if (ep.getRunState().intValue() == Ep.EP_RUN_STATE_RUN) {
					ep.setSecondCurrentReading(ep.getSecondCurrentSet());
					int secondVoltageReading = (int) ((ep.getSecondCurrentReading() == null ? 0 : ep.getSecondCurrentReading() / 1700) * (ep.getSecondVoltageSet() == null ? 0 : ep
							.getSecondVoltageSet()));
					ep.setSecondVoltagePeakReading(secondVoltageReading + 3);
					ep.setSecondVoltageReading((float) secondVoltageReading);
					DecimalFormat decimalFormat = new DecimalFormat(".0");
					float primaryCurrentReading = ((ep.getSecondCurrentReading() == null ? 0 : ep.getSecondCurrentReading()) / 1700)
							* (ep.getPrimaryCurrentSet() == null ? 0 : ep.getPrimaryCurrentSet());
					ep.setPrimaryCurrentReading(Float.parseFloat(decimalFormat.format(primaryCurrentReading)));
					ep.setPrimaryVoltageReading(380f);
				}
				// System.out.println(ep.getPrimaryVoltageReading());
			} else {
				ep.setPrimaryCurrentReading(0f);
				ep.setPrimaryVoltageReading(-1f);
				ep.setSecondCurrentReading(0f);
				ep.setSecondVoltagePeakReading(0);
				ep.setSecondVoltageReading(0f);
				ep.setSparkReading(0);
			}
		}
		epManager.bathUpdate(epList);
		for (Ep ep : epList) {
			// System.out.println(ep.getPrimaryVoltageReading());
		}
	}

	/**
	 * 处理振打
	 * 
	 * @author 夏江勇 2016年12月4日 上午9:38:01
	 * 
	 */
	private void handleRapper() {
		// System.out.println("----------quartz------------");
		Date beginDate = new Date();
		List<Rapper> rapperList = rapperManager.findAll();
		List<LowDevice> lowDeviceList = lowDeviceManager.findAll();
		for (Rapper rapper : rapperList) {
			// System.out.println(rapper.getComunication());
			boolean needUpdateForDb = true;
			if (null != rapper) {
				if (null != rapper.getLowDeviceId()) {
					for (LowDevice lowDevice : lowDeviceList) {
						if (lowDevice.getId().equals(rapper.getLowDeviceId()) && !lowDevice.getRunState().equals(rapper.getComunication())) {
							rapper.setComunication(lowDevice.getRunState());
							needUpdateForDb = true;
						}
					}
				}
			}
			// 当前运行模式非null，运行方式为“停止”，运行状态为”运行“，则将设备停运。
			if (null != rapper.getRunWay() && rapper.getRunWay() == 0 && rapper.getRunState() == 1) {
				needUpdateForDb = true;
				rapper.setRunState(0);
			} else if (null != rapper.getRunWay() && rapper.getRunWay() == 1 && rapper.getRunState() == 0) {
				// 当前运行模式非null，并且运行方式为“手动”，并且运行状态为“停运”，则将设备"启动“
				needUpdateForDb = true;
				rapper.setRunState(1);
			} else if (null != rapper.getRunWay() && rapper.getRunWay() == 2) {
				// 当前运行模式非null，并且运行方式为”自动“，则进行自动设备启停
				if (null != rapper.getRunTime() && rapper.getRunTime() > 0) {
					GregorianCalendar beingLevelC = new GregorianCalendar(2016, 1, 1, 0, 0, 0);
					long beginLevelTime = beingLevelC.getTimeInMillis() / 1000;
					int beginC = rapper.getBeginTime();
					int runTime = rapper.getRunTime();
					int waitTime = rapper.getWaitTime();
					GregorianCalendar currentTimeCalendar = new GregorianCalendar();
					currentTimeCalendar.setTime(new Date());
					long currentTime = currentTimeCalendar.getTimeInMillis() / 1000;
					long restSeconds = (currentTime - beginLevelTime - beginC) % (runTime + waitTime);
					if (restSeconds > runTime && rapper.getRunState() == 1) {
						rapper.setRunState(0);
						needUpdateForDb = true;
					} else if (restSeconds < runTime && rapper.getRunState() == 0) {
						rapper.setRunState(1);
						needUpdateForDb = true;
					}

				}
				if (needUpdateForDb) {
				}
			} else {

			}
			rapperManager.update(rapper);
			rapper = null;
		}
		rapperList = null;
	}

}
