package com.example.codecraftapi.services;

import org.springframework.stereotype.Service;

import java.text.DecimalFormat;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;

@Service
public class CommonService {

  public String getFormattedDate(Instant instant) {
    if (instant == null) {
      return null;
    }
    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd LLLL yyyy");
    LocalDateTime localDateTime = LocalDateTime.ofInstant(instant, ZoneId.systemDefault());
    return formatter.format(localDateTime);
  }

  public String getFileSizeInMB(long fileSize) {
    double sizeInMB = fileSize / (1024.0 * 1024.0);

    DecimalFormat decimalFormat = new DecimalFormat("#.##");
    return decimalFormat.format(sizeInMB) + " MB";
  }
}
